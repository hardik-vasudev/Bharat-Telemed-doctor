import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTemperatureHigh, FaHeartbeat, FaStethoscope } from "react-icons/fa";
import { GiSugarCane } from "react-icons/gi";


// Define sensor types for a clean, modular markup.
const SENSOR_TYPES = [
  { id: "temperature", icon: <FaTemperatureHigh size={30} className="text-red-500" />, label: "Temperature" },
  { id: "sugar", icon: <GiSugarCane size={30} className="text-orange-500" />, label: "Sugar Level" },
  { id: "heartRate", icon: <FaHeartbeat size={30} className="text-pink-500" />, label: "Heart Rate" },
  { id: "bloodPressure", icon: <FaStethoscope size={30} className="text-green-500" />, label: "Blood Pressure" },
];

const SensorData = () => {
  const navigate = useNavigate();
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [sensorMode, setSensorMode] = useState(null);
  const [sensorData, setSensorData] = useState([]);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Reset sensor mode and clear form when a sensor is selected.
  const handleSensorSelect = (sensor) => {
    setSelectedSensor(sensor);
    setSensorMode(null);
    setFormData({});
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to add a new sensor data entry.
  const addNewEntry = (value, mode) => {
    const newEntry = {
      id: Date.now(),
      sensor: selectedSensor,
      timestamp: new Date().toISOString(),
      value,
      mode,
    };
    setSensorData((prev) => [newEntry, ...prev]);
    setFormData({});
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    let value;
    if (selectedSensor === "bloodPressure") {
      value = `${formData.systolic || 0}/${formData.diastolic || 0}`;
    } else {
      value = formData.value;
    }
    addNewEntry(value, "Manual");
  };

  // Instead of fetching from a backend, display an instructive message.
  const handleKioskFetch = () => {
    setErrorMessage("Please connect the sensors to the Kiosk port.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/teleconsultation")}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Teleconsultation
        </button>
        <h1 className="ml-auto text-2xl font-bold">Sensor Data Library</h1>
      </div>

      {/* Sensor Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Sensor Type</h2>
        <div className="flex gap-4">
          {SENSOR_TYPES.map((sensor) => (
            <button
              key={sensor.id}
              onClick={() => handleSensorSelect(sensor.id)}
              className={`flex flex-col items-center p-4 border rounded ${
                selectedSensor === sensor.id ? "bg-blue-100" : ""
              }`}
            >
              {sensor.icon}
              <span>{sensor.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sensor Options */}
      {selectedSensor && (
        <div className="mb-6 p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold mb-2">
            Options for {selectedSensor.charAt(0).toUpperCase() + selectedSensor.slice(1)}
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setSensorMode("manual");
                setErrorMessage("");
              }}
              className={`px-4 py-2 rounded ${
                sensorMode === "manual" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Enter Manually
            </button>
            <button
              onClick={() => {
                setSensorMode("kiosk");
                setErrorMessage("");
              }}
              className={`px-4 py-2 rounded ${
                sensorMode === "kiosk" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Fetch from Kiosk
            </button>
          </div>
        </div>
      )}

      {/* Sensor Mode Area */}
      {sensorMode && (
        <div className="mb-6 p-4 bg-white shadow rounded">
          <h3 className="text-lg font-semibold mb-2">
            {sensorMode === "manual" ? "Manual Entry" : "Fetching Data"}
          </h3>
          {sensorMode === "manual" ? (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              {selectedSensor === "bloodPressure" ? (
                <div className="flex gap-4">
                  <input
                    type="number"
                    name="systolic"
                    placeholder="Systolic"
                    value={formData.systolic || ""}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                  <input
                    type="number"
                    name="diastolic"
                    placeholder="Diastolic"
                    value={formData.diastolic || ""}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
              ) : (
                <label className="block">
                  Value:
                  <input
                    type="number"
                    name="value"
                    value={formData.value || ""}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full mt-1"
                    required
                  />
                </label>
              )}
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
                Add Data
              </button>
            </form>
          ) : (
            <button
              onClick={handleKioskFetch}
              className="w-full bg-purple-600 text-white py-2 rounded"
            >
              Fetch Data
            </button>
          )}
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        </div>
      )}

      {/* Entered Sensor Data */}
      <div className="mb-6 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Entered Sensor Data</h3>
        {sensorData.length === 0 ? (
          <p className="text-gray-600">No data added yet.</p>
        ) : (
          <ul className="divide-y">
            {sensorData.map((entry) => (
              <li key={entry.id} className="py-2 flex justify-between">
                <span>
                  [{new Date(entry.timestamp).toLocaleTimeString()}]{" "}
                  {entry.sensor.toUpperCase()}: {entry.value} ({entry.mode})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Analyze Data Button */}
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/sensor-data-page", { state: { sensorData } })}
          className="px-6 py-3 bg-blue-700 text-white rounded hover:bg-blue-800"
          disabled={sensorData.length === 0}
        >
          Analyze Data
        </button>
      </div>
    </div>
  );
};

export default SensorData;
