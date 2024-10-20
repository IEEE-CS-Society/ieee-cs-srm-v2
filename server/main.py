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
    "http://ieee-cs-srm-v2.vercel.app","https://ieee-cs-srm-v2.vercel.app","http://ieee-cs-srm-v2.vercel.app/login","https://ieee-cs-srm-v2.vercel.app/login","http://ieee-cs-srm-v2.vercel.app/signup","https://ieee-cs-srm-v2.vercel.app/signup","http://localhost:3001","https://127.0.0.1:3001","http://localhost:8000","https://127.0.0.1:8000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Change from here 
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
conn = psycopg2.connect(os.getenv("DATABASE_URL"))
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES=60
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


@app.get("/events")
async def get_events():
    response = supabase.table('events').select('*').execute()
    return response.data


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
    <title>Password Reset Notification</title>
    <style>
        @keyframes fadeIn {{
            from {{
                opacity: 0;
            }}

            to {{
                opacity: 1;
            }}
        }}

        @keyframes slideIn {{
            from {{
                transform: translateY(20px);
                opacity: 0;
            }}

            to {{
                transform: translateY(0);
                opacity: 1;
            }}
        }}

        body {{
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: #1c1c1c;
            color: #ffffff;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }}

        .container {{
            max-width: 700px;
            margin: 40px auto;
            background-color: #2a2a2a;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            animation: fadeIn 0.8s ease-out;
        }}

        .header {{
            background: linear-gradient(135deg, #006064, #00838f);
            padding: 50px 30px;
            text-align: center;
            color: #ffffff;
        }}

        .header img {{
            max-width: 100%;
            height: auto;
            margin-bottom: 20px;
        }}

        .header h1 {{
            margin: 0;
            font-size: 38px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            animation: slideIn 0.8s ease-out;
            text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
        }}

        .content {{
            margin: 20px;
            text-align: center;
            color: #dddddd;
        }}

        h1 {{
            font-size: 28px;
            color: #ffffff;
            margin-bottom: 20px;
            animation: slideIn 0.8s ease-out;
        }}

        .hello {{
            color: #00c6ff;
        }}

        p {{
            font-size: 18px;
            margin-bottom: 20px;
            color: #bbbbbb;
            animation: fadeIn 1s ease-out;
        }}

        .important {{
            background-color: #333a40;
            padding: 20px;
            border-left: 6px solid #3498db;
            font-size: 20px;
            color: #e74c3c;
            border-radius: 8px;
            animation: slideIn 1s ease-out;
            max-width: 90%;
            margin: 0 auto;
        }}

        .button {{
            display: inline-block;
            background: linear-gradient(135deg, #d63031, #ff7675);
            color: #ffffff;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 40px;
            font-weight: bold;
            text-transform: uppercase;
            transition: all 0.3s ease;
            margin-top: 20px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
            animation: fadeIn 1.2s ease-out;
        }}

        .button:hover,
        .button:focus,
        .button:active {{
            background: linear-gradient(135deg, #c0392b, #e74c3c);
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }}

        .button:active {{
            transform: scale(0.95);
        }}

        .footer {{
            background-color: #1e1e1e;
            padding: 30px;
            text-align: center;
            font-size: 16px;
            color: #999999;
            border-top: 1px solid #333;
        }}

        .footer a {{
            color: #3498db;
            text-decoration: none;
            transition: color 0.2s ease-in-out;
        }}

        .footer a:hover {{
            color: #1f78c1;
        }}

        .social-links {{
            margin: 20px 0;
            text-align: center;
        }}

        .social-links a {{
            display: inline-block;
            margin: 0 10px;
            text-decoration: none;
            color: #bbbbbb;
            font-weight: bold;
            transition: all 0.3s ease;
        }}

        .social-links a:hover {{
            color: #3498db;
            transform: translateY(-2px);
        }}

        .warning {{
            background-color: #3a3a3a;
            border-left: 6px solid #e67e22;
            padding: 15px;
            border-radius: 8px;
            font-style: italic;
            color: #e67e22;
            animation: fadeIn 1.4s ease-out;
            max-width: 90%;
            margin: 0 auto;
        }}

        .footer .logo {{
            width: 180px;
            margin: 20px auto;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/47/IEEE_Computer.png/1200px-IEEE_Computer.png?20211216195043" alt="IEEE Logo" style="max-width: 100%; height: auto; margin-bottom: 20px;" />
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <h1 class="hello">Hello, {password_reset.email}</h1>
            <p>We have received a request to reset your password. Here is your old password for reference:</p>
            <div class="important">
                <strong>Old Password: {old_password}</strong>
            </div>
            <p>If this request wasn't made by you, please contact our support team immediately.</p>
            <div class="warning">
                If you didn't initiate this request, please contact our support team immediately to secure your account.
            </div>
            <p>Need assistance with your password reset? Our support team is here to help:</p>
            <a href="mailto:webdevteam.ieee@gmail.com?subject=Password%20Reset%20Assistance" class="button">Contact Support</a>
            <div class="social-links">
                <p>Connect with IEEE CS on:</p>
                <a href="https://www.facebook.com/aicssyc/">Facebook</a> |
                <a href="https://x.com/ComputerSociety">X</a> |
                <a href="https://www.linkedin.com/company/ieee-computer-society/">LinkedIn</a>
            </div>
        </div>
        <div class="footer">
            <a href="https://ibb.co/fGFhXxs"><img src="https://i.ibb.co/QjQ2JK4/IEEE-shitstrip.jpg" alt="IEEE-shitstrip" border="0" /></a>
            <p>&copy; {datetime.now().year} IEEE Computer Society. All rights reserved.</p>
            <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
    """

    send_email(password_reset.email, subject, body_html)

    return {"message": "Password reset email has been sent."}
