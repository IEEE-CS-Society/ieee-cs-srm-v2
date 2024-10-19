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
import secrets
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi import status

load_dotenv()

app = FastAPI(docs_url=None, redoc_url=None)

#run command : python -m uvicorn main2:app --reload

origins = [
    "http://localhost:3001","https://127.0.0.1:3001","http://localhost:8000","https://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Change from here 

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

DATABASE_URL = os.getenv("DATABASE_URL")
conn = psycopg2.connect(DATABASE_URL)
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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
