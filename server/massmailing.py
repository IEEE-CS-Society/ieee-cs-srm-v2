import gspread
from oauth2client.service_account import ServiceAccountCredentials
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage  # For image attachments
import time
import os
from dotenv import load_dotenv  # Load environment variables from .env

# Load environment variables from .env file
load_dotenv()

# Get credentials from environment variables
SENDER_EMAIL = os.getenv("EMAIL_USER")
SENDER_PASSWORD = os.getenv("EMAIL_PASS")
CREDENTIALS_JSON = {
    "type": os.getenv("TYPE"),
    "project_id": os.getenv("PROJECT_ID"),
    "private_key_id": os.getenv("PRIVATE_KEY_ID"),
    "private_key": os.getenv("PRIVATE_KEY").replace('\\n', '\n'),  # Replace newline escape sequences
    "client_email": os.getenv("CLIENT_EMAIL"),
    "client_id": os.getenv("CLIENT_ID"),
    "auth_uri": os.getenv("AUTH_URI"),
    "token_uri": os.getenv("TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("CLIENT_X509_CERT_URL"),
}

# Function to send an email with an inline image
def send_email(server, to_email, subject, body_html, image_path):
    # Create the email message
    msg = MIMEMultipart("related")
    msg['From'] = SENDER_EMAIL
    msg['To'] = to_email
    msg['Subject'] = subject

    # Create the alternative (HTML) part of the email
    msg_alternative = MIMEMultipart("alternative")
    msg.attach(msg_alternative)

    # Attach the HTML body
    msg_alternative.attach(MIMEText(body_html, 'html'))

    # Attach the image from the local path if it exists
    if os.path.exists(image_path):
        try:
            with open(image_path, 'rb') as img:
                mime_img = MIMEImage(img.read(), _subtype="png")
                mime_img.add_header('Content-ID', '<IEEELogo>')  # Content-ID for embedding image
                mime_img.add_header('Content-Disposition', 'inline', filename=os.path.basename(image_path))
                msg.attach(mime_img)
        except Exception as e:
            print("Error opening image file:", e)
    else:
        print(f"Image file {image_path} not found.")

    # Send the email through the already established server connection
    try:
        server.send_message(msg)
        print(f"Email sent successfully to {to_email}")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")

# Function to check for new event registrations
def check_new_registrations():
    # Set up the credentials
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_dict(CREDENTIALS_JSON, scope)
    client = gspread.authorize(creds)

    # Open the spreadsheet
    sheet = client.open_by_key("1uSPm49dhs6ZqSHeRwMx-GwS4svnl2qnqJj_fI0L02cE").worksheet('event1')

    # Store previously sent emails to avoid duplicates
    sent_emails = set()

    # Set up the SMTP server once
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        print("SMTP server connected")
    except Exception as e:
        print(f"Failed to connect to SMTP server: {e}")
        return

    while True:
        # Re-fetch data
        data = sheet.get_all_values()
        
        # Start from the second row (index 1)
        for i in range(1, len(data)):
            if len(data[i]) < 6:  # Ensure there are at least 6 columns
                print(f"Row {i} has insufficient data: {data[i]}")
                continue  # Skip to the next iteration

            email = data[i][0]  # Column A (Email)
            event_name = data[i][5]  # Column F (Event Name)
            phone_number = data[i][1]  # Column B (Phone Number)
            srm_id = data[i][2]  # Column C (SRM ID)
            roll_no = data[i][3]  # Column D (Roll No)

            # Check if there's an event registered and the email has not been sent yet
            if event_name and email not in sent_emails:
                subject = f"Registration Confirmation for {event_name}"

                image_path = os.path.join(os.path.dirname(__file__), 'IEEE-CS_LogoTM-white.png')

                # Updated HTML email body with dynamic data
                body_html = f"""
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Event Registration Confirmation</title>
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
                        .highlight {{
                            background-color: #f0f0f0;
                            border-left: 4px solid #000000;
                            padding: 20px;
                            margin-bottom: 25px;
                            border-radius: 0 8px 8px 0;
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
                        .footer {{
                            background-color: #f0f0f0;
                            padding: 25px;
                            text-align: center;
                            font-size: 0.9em;
                            color: #000000;
                            border-top: 2px solid #000000;
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
                            <img src="cid:IEEELogo" alt="IEEE CS Logo" class="logo">
                        </div>
                        <div class="content">
                            <h1>Event Registration Confirmed</h1>
                            <p>Dear {email},</p>
                            <p>We're pleased to confirm your registration for our upcoming IEEE Computer Society event. Below are your details:</p>
                            <div class="info-box">
                                <h2>Student Details</h2>
                                <ul>
                                    <li><strong>Phone Number:</strong> {phone_number}</li>
                                    <li><strong>SRM ID:</strong> {srm_id}</li>
                                    <li><strong>Roll No:</strong> {roll_no}</li>
                                </ul>
                            </div>
                            <div class="highlight">
                                <h2 style="color: #000000; margin-top: 0;">Event Details</h2>
                                <p><strong>Name:</strong> {event_name}<br>
                                <strong>Date:</strong> November 5, 2024<br>
                                <strong>Time:</strong> 9:45 AM<br>
                                <strong>Location:</strong> SRM University</p>
                            </div>
                            <p>If you have any questions, feel free to reply to this email.</p>
                            <p>Best Regards,<br>The IEEE Computer Society Team</p>
                            <a href="http://ieee-srm.com" class="button">Visit Our Website</a>
                        </div>
                        <div class="footer">
                            <p>&copy; 2024 IEEE Computer Society. All rights reserved.</p>
                            <div class="social-links">
                                <a href="https://www.facebook.com/IEEE">Facebook</a>
                                <a href="https://twitter.com/IEEE">Twitter</a>
                                <a href="https://www.linkedin.com/company/ieee">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
                """

                # Send email
                send_email(server, email, subject, body_html, image_path)

                # Add the email to the set of sent emails to avoid sending duplicates
                sent_emails.add(email)

        time.sleep(5)  # Pause before checking for new registrations again

    # Close the SMTP server
    server.quit()

# Start the email-sending process
if __name__ == "__main__":
    check_new_registrations()
