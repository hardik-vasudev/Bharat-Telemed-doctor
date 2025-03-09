import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorJitsiMeet from "../components/JitsiMeetComponent"; // Component that accepts jwt & doctorName
import Notepad from "../components/Notepad";
import PrescriptionBuilder from "../components/PrescriptionBuilder";
import {
  FaStickyNote,
  FaPrescriptionBottle,
  FaHeartbeat,
  FaRobot,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import JivanAISymptomForm from "../components/JivanAI";


const DoctorTeleConsultationPage = () => {
  // State for expanding/collapsing the doctor's panel and for showing tool components
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const navigate = useNavigate();

  // Retrieve JWT and doctor details from navigation state (sent from WaitingScreen)
  const { state } = useLocation();
  const { jwt, doctor } = state || { 
    jwt: "", 
    doctor: { doctor_name: "Doctor", profession: "", experience: "" } 
  };

  const goToMainMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 p-4">
      {/* Left Side: Jitsi Video Call */}
      <div
        className={`transition-all duration-300 ${
          isExpanded ? "w-[60%]" : "w-[85%]"
        } h-full flex items-center justify-center p-4`}
      >
        <div className="w-full h-full bg-gray-100 shadow-md rounded-xl overflow-hidden">
          {/* Passing JWT and doctor's name to the Jitsi component */}
          <DoctorJitsiMeet jwt={jwt} doctorName={doctor.doctor_name} />
        </div>
      </div>

      {/* Right Side: Doctor's Panel (using UI & buttons from TeleConsultationPage) */}
      <div
        className={`transition-all duration-300 ${
          isExpanded ? "w-[40%]" : "w-[15%]"
        } h-full p-6 bg-white shadow-lg rounded-xl flex flex-col items-center space-y-6`}
      >
        {/* Expand/Collapse Button */}
        <button
          className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
        </button>

        {/* If a tool is selected, render its component */}
        {selectedTool ? (
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-full">{selectedTool}</div>
          </div>
        ) : (
          // Default Panel Content (UI and Buttons)
          <>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md">
              Telemed Toolkit
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-700">Patient Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Notepad */}
              <button
                onClick={() =>
                  setSelectedTool(
                    <Notepad onClose={() => setSelectedTool(null)} />
                  )
                }
                className="flex flex-col items-center space-y-2 bg-blue-500 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-600"
              >
                <FaStickyNote size={30} /> <span>Notepad</span>
              </button>

              {/* Prescription */}
              <button
                onClick={() =>
                  setSelectedTool(
                    <PrescriptionBuilder onClose={() => setSelectedTool(null)} />
                  )
                }
                className="flex flex-col items-center space-y-2 bg-green-500 text-white px-6 py-4 rounded-lg shadow-md hover:bg-green-600"
              >
                <FaPrescriptionBottle size={30} /> <span>Prescription</span>
              </button>

              {/* Sensor Data (Placeholder) */}
              <button
                onClick={() =>
                  setSelectedTool(
                    <p className="text-gray-700">Sensor Data Coming Soon</p>
                  )
                }
                className="flex flex-col items-center space-y-2 bg-yellow-500 text-white px-6 py-4 rounded-lg shadow-md hover:bg-yellow-600"
              >
                <FaHeartbeat size={30} /> <span>Sensor Data</span>
              </button>

              {/* JivanAI (Placeholder) */}
              <button
                onClick={() =>
                  setSelectedTool(
                    <JivanAISymptomForm onClose={() => setSelectedTool(null)}/>
                  )
                }
                className="flex flex-col items-center space-y-2 bg-purple-500 text-white px-6 py-4 rounded-lg shadow-md hover:bg-purple-600"
              >
                <FaRobot size={30} /> <span>JivanAI</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Main Menu Button (Bottom Right Corner) */}
      <button
        onClick={goToMainMenu}
        className="fixed bottom-4 right-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Main Menu
      </button>
    </div>
  );
};

export default DoctorTeleConsultationPage;
