import os
import gspread
from google.oauth2.service_account import Credentials
import traceback
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv

# Load environment variables from credentials.env file
load_dotenv('credentials.env')

app = FastAPI()

# Load the credentials from the environment variables
creds = None
try:
    creds = Credentials.from_service_account_info({
        "type": os.getenv('TYPE'),
        "project_id": os.getenv('PROJECT_ID'),
        "private_key_id": os.getenv('PRIVATE_KEY_ID'),
        "private_key": os.getenv('PRIVATE_KEY').replace('\\n', '\n'),
        "client_email": os.getenv('CLIENT_EMAIL'),
        "client_id": os.getenv('CLIENT_ID'),
        "auth_uri": os.getenv('AUTH_URI'),
        "token_uri": os.getenv('TOKEN_URI'),
        "auth_provider_x509_cert_url": os.getenv('AUTH_PROVIDER_X509_CERT_URL'),
        "client_x509_cert_url": os.getenv('CLIENT_X509_CERT_URL'),
        "universe_domain": os.getenv('UNIVERSE_DOMAIN')
    }, scopes=["https://www.googleapis.com/auth/spreadsheets"])  # Add scopes here
    print("Authorized successfully!")
except Exception as e:
    print(f"Authorization failed: {e}")
    traceback.print_exc()

# Define the sheet ID and initialize the sheet variable
sheet_id = os.getenv('SHEET_ID')
sheet = None

# Attempt to authorize and access the Google Sheet
try:
    client = gspread.authorize(creds)
    sheet = client.open_by_key(sheet_id).worksheet('Sheet1')  # Ensure this worksheet exists
    print("Sheet opened successfully!")
except Exception as e:
    print(f"Failed to open sheet: {e}")
    traceback.print_exc()

# Now access the event1 worksheet correctly
try:
    event1 = client.open_by_key(sheet_id).worksheet("event1")  # Correctly access event1
    print("Event1 worksheet accessed successfully!")

    # Update headers in the event1 worksheet
    headers = ['Email', 'Phone Number', 'SRM ID', 'Roll No', 'IEEE Membership', 'Event Registered']
    event1.update('A1:F1', [headers])  # Update headers in a single call
    print("Headers updated successfully!")

    # Copy relevant data from Sheet1 to event1
    data = sheet.get_all_values()[1:]  # Get all values except the header row
    for row_index, row in enumerate(data):
        # Ensure there are enough columns to copy
        email = row[0] if len(row) > 0 else ""
        phone_number = row[2] if len(row) > 2 else ""
        srm_id = row[3] if len(row) > 3 else ""
        roll_no = row[4] if len(row) > 4 else ""
        ieee_membership = row[5] if len(row) > 5 else ""
        event_registered = row[6] if len(row) > 6 else ""

        # Update event1 worksheet
        event1.update(f'A{row_index + 2}:F{row_index + 2}', [[email, phone_number, srm_id, roll_no, ieee_membership, event_registered]])
            
    print("Data copied successfully!")

except Exception as e:
    print(f"Failed to access or update event1 worksheet: {e}")
    traceback.print_exc()

# Function to get emails from the first column of the sheet
def get_emails():
    try:
        email_column = sheet.col_values(1)
        emails = email_column[1:]  # Skip the first row if it's a header
        return emails
    except Exception as e:
        print(f"Failed to retrieve emails: {e}")
        return []

@app.get("/emails/")
def read_emails():
    emails = get_emails()
    if emails:
        return {"emails": emails}
    else:
        raise HTTPException(status_code=404, detail="No emails found.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
