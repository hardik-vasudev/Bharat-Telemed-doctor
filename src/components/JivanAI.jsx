import React, { useState } from "react";



const JivanAISymptomForm = ({ onPredict }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    temperature: "",
    bloodPressure: "",
    sugarLevel: "",
    heartRate: "",
  });

  // Handle input change and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(formData); // Call parent function to predict disease
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">JivanAI Disease Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input fields for health parameters */}
        <input
          type="number"
          name="temperature"
          placeholder="Temperature (°C)"
          value={formData.temperature}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="bloodPressure"
          placeholder="Blood Pressure (mmHg)"
          value={formData.bloodPressure}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="sugarLevel"
          placeholder="Sugar Level (mg/dL)"
          value={formData.sugarLevel}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="heartRate"
          placeholder="Heart Rate (bpm)"
          value={formData.heartRate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Predict
        </button>
      </form>
    </div>
  );
};

export default JivanAISymptomForm;
