from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import gspread
from google.oauth2.service_account import Credentials

app = FastAPI()

scopes = ["https://www.googleapis.com/auth/spreadsheets"]
creds = Credentials.from_service_account_file("credentials.json", scopes=scopes)
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
