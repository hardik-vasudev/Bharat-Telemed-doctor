from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise HTTPException(status_code=500, detail="MONGO_URI not found in .env")

try:
    client = MongoClient(MONGO_URI)
    print("✅ Connected to MongoDB:", client.server_info())
except Exception as e:
    print("❌ Failed to connect to MongoDB:", e)
    raise HTTPException(status_code=500, detail="Failed to connect to MongoDB")

# Use the 'BharatTelemed' database and 'doctor_consultations' collection
db = client["BharatTelemed"]
doctor_consultation_collection = db["doctor_consultations"]

app = FastAPI()

# ✅ Improved CORS for Security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://bharat-telemed-doctor.vercel.app"],  # Change to your actual Vercel URL
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)

# Pydantic model for Doctor consultation details
class Doctor(BaseModel):
    doctor_id: str
    doctor_name: str
    profession: str
    concern: str
    jwt: str
    roomName: str = "DefaultMeetingRoom"

# Endpoint to create doctor consultation details
@app.post("/api/doctor/")
async def create_doctor_consultation(doctor: Doctor):
    try:
        result = doctor_consultation_collection.insert_one(doctor.dict())
        return {"id": str(result.inserted_id), "message": "Doctor consultation details inserted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to insert doctor consultation details: {e}")

# Endpoint to fetch doctor consultation details
@app.get("/api/doctor/waiting-screen")
async def get_doctor_waiting_screen(doctorId: str):
    consultation = doctor_consultation_collection.find_one({"doctor_id": doctorId})
    if not consultation:
        raise HTTPException(status_code=404, detail="Doctor consultation details not found")
    
    room_name = consultation.get("roomName", "DefaultMeetingRoom")
    
    return {
        "doctor": {
            "doctor_id": consultation["doctor_id"],
            "doctor_name": consultation["doctor_name"],
            "profession": consultation["profession"],
            "concern": consultation["concern"],
        },
        "jwt": consultation["jwt"],
        "roomName": room_name,
    }

@app.get("/")
def read_root():
    return {"message": "Doctor Backend is running!"}

# ✅ Port Configuration for Render
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 10000))  # Render will assign the port
    uvicorn.run(app, host="0.0.0.0", port=port)
