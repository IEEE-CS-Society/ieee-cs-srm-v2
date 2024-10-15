from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import gspread
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv(dotenv_path="credentials.env")
creds_info = {
    "type": "service_account",
    "project_id": os.getenv("PROJECT_ID"),
    "private_key_id": os.getenv("PRIVATE_KEY_ID"),
    "private_key": os.getenv("PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": os.getenv("CLIENT_EMAIL"),
    "client_id": os.getenv("CLIENT_ID"),
    "auth_uri": os.getenv("AUTH_URI"),
    "token_uri": os.getenv("TOKEN_URI"),
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL")
}

scopes = ["https://www.googleapis.com/auth/spreadsheets"]
creds = Credentials.from_service_account_info(creds_info, scopes=scopes)
client = gspread.authorize(creds)

sheet_id = "1uSPm49dhs6ZqSHeRwMx-GwS4svnl2qnqJj_fI0L02cE"  
sheet = client.open_by_key(sheet_id).sheet1  

class Login(BaseModel):
    email: str
    password: str

class Register(BaseModel):
    email: str
    password: str
    phone_number: str
    srm_id: str
    roll_no: str
    ieee_membership: str = None  

def user_exists(email: str):
    records = sheet.get_all_records()
    for record in records:
        if record["Email"] == email:
            return record
    return None

@app.post("/login")
async def login(user: Login):
    existing_user = user_exists(user.email)
    
    if existing_user:
        if existing_user["Password"] == user.password:
            return {"message": "Login successful!"}
        raise HTTPException(status_code=400, detail="Invalid password.")
    
    return {"message": "User not found. Please register."}

@app.post("/register")
async def register(new_user: Register):
    existing_user = user_exists(new_user.email)
    
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists. Please log in.")
    
    sheet.append_row([
        new_user.email,
        new_user.password,
        new_user.phone_number,
        new_user.srm_id,
        new_user.roll_no,
        new_user.ieee_membership if new_user.ieee_membership else "None"
    ])
    
    return {"message": "Registration successful! Please log in."}
