
import React from "react";

const SensorDataDisplay = ({ sensorData }) => {
  return (
    <div className="bg-white p-4 shadow rounded m-6">
      <h2 className="text-xl font-bold mb-4">Submitted Sensor Data</h2>
      {sensorData.length === 0 ? (
        <p className="text-gray-600">No sensor data submitted yet.</p>
      ) : (
        <ul className="divide-y">
          {sensorData.map((entry) => (
            <li key={entry.id} className="py-2">
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(entry.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Temperature:</strong> {entry.temperature} °C,{" "}
                <strong>Sugar:</strong> {entry.sugar} mg/dL,{" "}
                <strong>Heart Rate:</strong> {entry.heartRate} bpm,{" "}
                <strong>Blood Pressure:</strong> {entry.bloodPressure} mmHg,{" "}
                <strong>Oxygen:</strong> {entry.oxygen}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SensorDataDisplay;
