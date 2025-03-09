from fastapi import FastAPI, HTTPException, Query
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise HTTPException(status_code=500, detail="MONGO_URI not found in .env")

client = MongoClient(MONGO_URI)
db = client["BharatTelemed"]
# Use the doctor collection (for example, "doctor_consultations")
doctor_collection = db["doctor_consultations"]

app = FastAPI()

@app.get("/api/doctor/get-jwt")
def get_doctor_jwt(doctor_id: str = Query(...)):
    """
    Fetch the JWT associated with the given doctor ID.
    For example, if doctor_id is 'DOC1234', it returns the stored JWT for that doctor.
    """
    doc = doctor_collection.find_one({"doctor_id": doctor_id})
    if doc and "jwt" in doc:
        return {"jwt": doc["jwt"]}
    else:
        raise HTTPException(status_code=404, detail="JWT not found for doctor")

@app.get("/")
def read_root():
    return {"message": "Doctor Backend is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8003, reload=True)