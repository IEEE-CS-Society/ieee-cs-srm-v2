from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import psycopg2
from typing import List, Dict
from supabase import create_client, Client
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi import status

load_dotenv()

app = FastAPI(docs_url=None, redoc_url=None)

#run command : python -m uvicorn main2:app --reload

origins = [
    "http://ieee-cs-srm-v2.vercel.app","https://ieee-cs-srm-v2.vercel.app","http://localhost:3001","https://127.0.0.1:3001","http://localhost:8000","https://127.0.0.1:8000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Change from here
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
conn = psycopg2.connect(os.getenv("DATABASE_URL"))
SECRET_KEY = os.getenv("SECRET_KEY")

#to here

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
USERNAME = "admin"
PASSWORD = "secret"
security = HTTPBasic()


class Event(BaseModel):
    tag: str
    title: str
    details: str
    time: str
    place: str
    date: str
    fees: str
    benefits: str


class Participant(BaseModel):
    user_email: str
    name: str
    registration_number: str
    phone_number: str


class Register(BaseModel):
    email: str
    password: str
    phone_number: str
    srm_id: str
    roll_no: str
    ieee_membership: str = None


class Login(BaseModel):
    email: str
    password: str

class PasswordReset(BaseModel):
    email: str


def user_exists(email: str):
    response = supabase.table('users').select('*').eq('email', email).execute()
    if response.data:
        return response.data[0]
    return None


def insert_user(email: str, password: str, phone_number: str, srm_id: str, roll_no: str, ieee_membership: str):
    supabase.table('users').insert({
        'email': email,
        'password': password,
        'phone_number': phone_number,
        'srm_id': srm_id,
        'roll_no': roll_no,
        'ieee_membership': ieee_membership
    }).execute()

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("email")
        if email is None:
            raise HTTPException(status_code=403, detail="Token is invalid.")
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=403, detail="Token has expired.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=403, detail="Invalid token.")

def send_email(to_email, subject, body_html):
    sender_email = os.getenv("SENDER_EMAIL") #mail id
    sender_password = os.getenv("SENDER_PASSWORD")
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body_html, 'html'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
    except Exception as e:
        print("Error sending email:", e)



@app.post("/register")
async def register(new_user: Register):
    existing_user = user_exists(new_user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists. Please log in.")
    insert_user(new_user.email, new_user.password, new_user.phone_number, new_user.srm_id, new_user.roll_no,
                new_user.ieee_membership if new_user.ieee_membership else "None")
    return {"message": "Registration successful! Please log in."}


@app.post("/login")
async def login(user: Login):
    existing_user = user_exists(user.email)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found. Please register.")
    if existing_user["password"] == user.password:
        token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"email": user.email}, expires_delta=token_expires)
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=400, detail="Invalid password.")


def check_docs_credentials(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, USERNAME)
    correct_password = secrets.compare_digest(credentials.password, PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )



@app.get("/docs", include_in_schema=False)
async def get_documentation(credentials: HTTPBasicCredentials = Depends(check_docs_credentials)):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")

@app.get("/openapi.json", include_in_schema=False)
async def get_openapi(credentials: HTTPBasicCredentials = Depends(check_docs_credentials)):
    return app.openapi()

@app.post("/events/add")
async def add_event(event: Event, current_user: str = Depends(verify_token)):
    event_data = {
        "tag": event.tag,
        "title": event.title,
        "details": event.details,
        "time": event.time,
        "place": event.place,
        "date": event.date,
        "fees": event.fees,
        "benefits": event.benefits,
        "participants_count": 0
    }
    response = supabase.table('events').insert(event_data).execute()

    event_id = response.data[0]['id']

    create_table_query = f"""
    CREATE TABLE event_participants_{event_id} (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255),
        name VARCHAR(255),
        registration_number VARCHAR(50),
        phone_number VARCHAR(15),
        UNIQUE(user_email)
    );
    """

    with conn.cursor() as cur:
        cur.execute(create_table_query)
        conn.commit()

    return {"message": f"Event '{event.title}' added successfully with table 'event_participants_{event_id}' created."}


@app.post("/events/{event_id}/register")
async def register_participant(event_id: int, participant: Participant, current_user: str = Depends(verify_token)):
    check_table_query = f"SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'event_participants_{event_id}');"

    with conn.cursor() as cur:
        cur.execute(check_table_query)
        table_exists = cur.fetchone()[0]

        if not table_exists:
            raise HTTPException(status_code=404, detail=f"Table for event {event_id} does not exist.")

        insert_participant_query = f"""
        INSERT INTO event_participants_{event_id} (user_email, name, registration_number, phone_number)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (user_email) DO NOTHING;
        """
        cur.execute(insert_participant_query, (
            participant.user_email, participant.name, participant.registration_number, participant.phone_number))
        conn.commit()

    supabase.rpc('increment_participant_count', {"event_id": event_id}).execute()

    return {"message": f"Participant '{participant.user_email}' registered for event {event_id}."}


@app.get("/events/{event_id}/participants")
async def get_event_participants(event_id: int, current_user: str = Depends(verify_token)):
    check_table_query = f"SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'event_participants_{event_id}');"

    with conn.cursor() as cur:
        cur.execute(check_table_query)
        table_exists = cur.fetchone()[0]

        if not table_exists:
            raise HTTPException(status_code=404, detail=f"Table for event {event_id} does not exist.")

        get_participants_query = f"SELECT * FROM event_participants_{event_id};"
        cur.execute(get_participants_query)
        participants = cur.fetchall()

    return participants


@app.get("/events", response_model=List[Dict])
async def get_events():
    response = supabase.table('events').select('*').execute()
    return response.data


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
import asyncio

app = FastAPI()

class PasswordReset(BaseModel):
    email: str

def user_exists(email: str):
    # Mocked function to check if user exists.
    # Replace this with actual logic.
    if email == "test@example.com":
        return {"email": email, "password": "old_password123"}
    return None

def send_email(to_email: str, subject: str, body_html: str):
    # Mocked function to send an email.
    # Replace this with actual email sending logic.
    print(f"Sending email to: {to_email}")
    print(f"Subject: {subject}")
    print(f"Body: {body_html}")

@app.post("/password-reset")
async def password_reset(password_reset: PasswordReset):
    existing_user = user_exists(password_reset.email)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")

    old_password = existing_user["password"]  # Retrieve old password
    subject = "Password Reset Request"
    body_html = f"""
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Password</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        body {{
            font-family: 'Roboto', sans-serif;
            background-color: #f0f4f8;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }}
        .container {{
            max-width: 600px;
            width: 100%;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            position: relative;
        }}
        .logo-container {{
            text-align: center;
            padding: 30px 0;
            background-color: rgba(255, 255, 255, 0.1);
        }}
        .content {{
            background-color: rgba(255, 255, 255, 0.95);
            margin: 20px;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            position: relative;
            z-index: 1;
            backdrop-filter: blur(10px);
        }}
        h1 {{
            margin: 0 0 20px;
            font-size: 28px;
            font-weight: 700;
            color: #333;
            text-transform: uppercase;
            letter-spacing: 1px;
        }}
        p {{
            color: #555;
            line-height: 1.8;
            margin-bottom: 25px;
            font-weight: 300;
        }}
        .password-container {{
            background-color: #f0f4f8;
            border: 2px solid #2575fc;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-size: 18px;
            font-weight: 500;
            color: #333;
        }}
        .footer {{
            background-color: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            position: relative;
            z-index: 1;
        }}
        .icon-container {{
            background: rgba(255, 255, 255, 0.2);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 30px;
        }}
        .icon {{
            font-size: 48px;
            color: #ffffff;
        }}
        .particles {{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }}
        .particle {{
            position: absolute;
            border-radius: 50%;
            animation: float 20s infinite;
            opacity: 0.3;
        }}
        @keyframes float {{
            0%, 100% {{ transform: translateY(0) rotate(0deg); }}
            25% {{ transform: translateY(-30px) rotate(90deg); }}
            50% {{ transform: translateY(-15px) rotate(180deg); }}
            75% {{ transform: translateY(-30px) rotate(270deg); }}
        }}
    </style>
</head>
<body>
<div class="container">
    <div class="particles">
        <div class="particle" style="top: 20%; left: 10%; width: 30px; height: 30px; background-color: rgba(255,255,255,0.3);"></div>
        <div class="particle" style="top: 60%; left: 80%; width: 20px; height: 20px; background-color: rgba(255,255,255,0.2);"></div>
        <div class="particle" style="top: 80%; left: 30%; width: 25px; height: 25px; background-color: rgba(255,255,255,0.25);"></div>
        <div class="particle" style="top: 40%; left: 60%; width: 15px; height: 15px; background-color: rgba(255,255,255,0.15);"></div>
        <div class="particle" style="top: 10%; left: 90%; width: 35px; height: 35px; background-color: rgba(255,255,255,0.35);"></div>
    </div>
    <div class="logo-container">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/IEEE_Computer.png/1200px-IEEE_Computer.png?20211216195043" alt="Company Logo" class="logo">
    </div>
    <div class="content">
        <div class="icon-container">
            <span class="icon">🔑</span>
        </div>

        <h3 class="hello">Hello, {password_reset.email}</h3>
        <h1>Your Password</h1>
        <p>We received a request for your current password. Here it is:</p>
        <div class="password-container">
            {old_password}
        </div>
        <p>For security reasons, we recommend changing your password after logging in.</p>
        <p style="font-size: 12px; margin-top: 30px; color: #777;">If you did not request this information, please contact our support team immediately at.</p>
        <strong style="font-size: 13px;margin-top: 30px;color: #6a11cb;">webdevteam.ieee@gmail.com</strong>
    </div>
    <div class="footer">
        <p>© {datetime.now().year} IEEE Computer Society. All rights reserved. Please do not reply to this email.</p>
    </div>
</div>
</body>
</html>
    """

    send_email(password_reset.email, subject, body_html)

    return {"message": "Password reset email has been sent."}
