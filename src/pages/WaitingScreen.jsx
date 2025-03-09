import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DoctorWaitingScreen = () => {
  const [doctorId, setDoctorId] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [jwt, setJwt] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFetchDoctorData = async () => {
    try {
      setLoading(true);
      console.log('Fetching doctor data for ID:', doctorId);
      const response = await axios.get(
        `http://127.0.0.1:8002/api/doctor/waiting-screen?doctorId=${doctorId}`
      );
      console.log('Doctor data received:', response.data);
      setDoctorData(response.data.doctor);
      setJwt(response.data.jwt);
      setError('');
      setLoading(false);
    } catch (err) {
      console.error('Error fetching doctor data:', err);
      setError('Failed to fetch doctor data. Please try again.');
      setLoading(false);
    }
  };

  const handleJoinTeleconsultation = () => {
    if (!doctorData || !jwt) return;
    navigate('/teleconsultation', { state: { jwt, doctor: doctorData } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {!doctorData ? (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Doctor Waiting Room</h2>
          <input
            type="text"
            placeholder="Enter Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="border-2 border-gray-300 p-2 mb-4 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          />
          <button
            onClick={handleFetchDoctorData}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all mb-4"
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </>
      ) : (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Doctor Details</h2>
          <p className="mb-2"><strong>Name:</strong> {doctorData.doctor_name}</p>
          <p className="mb-2"><strong>Profession:</strong> {doctorData.profession}</p>
          <p className="mb-2"><strong>Concern:</strong> {doctorData.concern}</p>
          <p className="mb-4"><strong>ID:</strong> {doctorData.doctor_id}</p>
          <button
            onClick={handleJoinTeleconsultation}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Join Teleconsultation
          </button>
        </div>
      )}
      <button
        onClick={() => navigate('/menu')}
        className="mt-6 bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all"
      >
        Main Menu
      </button>
    </div>
  );
};

export default DoctorWaitingScreen;
