from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import gspread
from google.oauth2.service_account import Credentials
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = FastAPI()

# Load the credentials from the new-cred.json file
with open("new-cred.json", "r") as file:
    cred_info = json.load(file)

# Create credentials using the information from new-cred.json and set the scope
creds = Credentials.from_service_account_info(cred_info, scopes=["https://www.googleapis.com/auth/spreadsheets"])

# Authorize the gspread client using the credentials
client = gspread.authorize(creds)

# Google Sheets ID and access the sheet
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

class PasswordReset(BaseModel):
    email: str

# Function to check if a user already exists
def user_exists(email: str):
    records = sheet.get_all_records() or []
    for record in records:
        if "Email" in record and record["Email"] == email:
            return record
    return None

# Function to send an email with HTML content
def send_email(to_email, subject, body_html):
    sender_email = "webdevteam.ieee@gmail.com"  # Your email
    sender_password = "znobhdhmraraoxdg"  # Your email password

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = subject

    # Attach the HTML body
    msg.attach(MIMEText(body_html, 'html'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
    except Exception as e:
        print("Error sending email:", e)


# API endpoint for login
@app.post("/login")
async def login(user: Login):
    existing_user = user_exists(user.email)

    if existing_user:
        if existing_user["Password"] == user.password:
            return {"message": "Login successful!"}
        raise HTTPException(status_code=400, detail="Invalid password.")

    return {"message": "User not found. Please register."}

# API endpoint for registration
@app.post("/register")
async def register(new_user: Register):
    existing_user = user_exists(new_user.email)

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists. Please log in.")

    # Append the new user's data to the Google Sheet
    try:
        sheet.append_row([
            new_user.email,
            new_user.password,  # Consider hashing this before storing
            new_user.phone_number,
            new_user.srm_id,
            new_user.roll_no,
            new_user.ieee_membership if new_user.ieee_membership else "None"
        ])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving user data: {str(e)}")

    return {"message": "Registration successful! Please log in."}

# API endpoint for password reset
@app.post("/reset-password")
async def reset_password(reset_request: PasswordReset):
    existing_user = user_exists(reset_request.email)

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Get the old password
    old_password = existing_user["Password"]

    # Send the old password via email with the updated HTML content
    subject = "Your Old Password"
    body_html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forget Password</title>
        <style>
            body {{
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #000000;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f0f0f0;
            }}
            .container {{
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }}
            .header {{
                background-color: #000000;
                padding: 30px 20px;
                text-align: center;
            }}
            .logo {{
                max-width: 200px;
                height: auto;
            }}
            .content {{
                padding: 40px 30px;
            }}
            h1 {{
                color: #000000;
                margin-bottom: 25px;
                font-size: 28px;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
            }}
            .button {{
                display: inline-block;
                background-color: #000000;
                color: #ffffff;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: background-color 0.3s ease;
            }}
            .button:hover {{
                background-color: #333333;
            }}
            .info-box {{
                background-color: #f8f8f8;
                border: 1px solid #000000;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
            }}
            .info-box h2 {{
                color: #000000;
                margin-top: 0;
            }}
            .social-links {{
                margin-top: 20px;
            }}
            .social-links a {{
                display: inline-block;
                margin: 0 10px;
                color: #000000;
                text-decoration: none;
                font-weight: bold;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://www.ieee.cz/data/Chapters/Computer/Logo/IEEE-CS_LogoTM-white.png" alt="IEEE CS Logo" class="logo">
            </div>
            <div class="content">
                <h1>Your Old Password</h1>
                <p>Dear {reset_request.email},</p>
                <p>Your old password is: <strong>{old_password}</strong></p>
                <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                <p style="text-align: center;">
                    <a href="#" class="button">Contact Support</a>
                </p>
                <div class="social-links">
                    <p>Connect with IEEE CS:</p>
                    <a href="https://www.facebook.com/aicssyc/">Facebook</a> | 
                    <a href="https://x.com/ComputerSociety">X</a> | 
                    <a href="https://www.linkedin.com/company/ieee-computer-society/">LinkedIn</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    """

    send_email(reset_request.email, subject, body_html)

    return {"message": "Old password sent to your email."}
