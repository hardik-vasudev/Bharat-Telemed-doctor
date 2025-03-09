
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaArrowLeft } from "react-icons/fa";

const SensorDataPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // Received sensor data from SensorData.jsx; default to empty array if none
  const sensorData = (state && state.sensorData) || [];

  // Define the sensors to analyze and labels
  const sensors = ["temperature", "sugar", "heartRate", "bloodPressure"];
  const sensorLabels = {
    temperature: "Temperature (°C)",
    sugar: "Sugar Level (mg/dL)",
    heartRate: "Heart Rate (bpm)",
    bloodPressure: "Blood Pressure (mmHg)",
  };

  // Filter and sort data for each sensor type
  const getSensorChartData = (type) => {
    const data = sensorData
      .filter((d) => d.sensor === type)
      .map((d) => {
        // For numeric values, parse the value (for blood pressure, leave as string)
        let numericValue = d.value;
        if (type !== "bloodPressure") {
          numericValue = parseFloat(d.value);
        }
        return {
          timestamp: new Date(d.timestamp).toLocaleTimeString(),
          value: numericValue,
        };
      })
      .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
    return data;
  };

  // Render a chart for each sensor type that has data
  const renderCharts = () => {
    return sensors.map((sensor) => {
      const data = getSensorChartData(sensor);
      if (!data.length) return null;
      // Example: For temperature, change line color if any reading exceeds 37°C
      const lineColor =
        sensor === "temperature"
          ? data.some((d) => d.value > 37)
            ? "#FF0000"
            : "#8884d8"
          : "#8884d8";
      return (
        <div key={sensor} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{sensorLabels[sensor]}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip labelFormatter={(label) => label} />
              <Line type="monotone" dataKey="value" stroke={lineColor} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:text-blue-800">
          <FaArrowLeft className="mr-2" />
          Back to Sensor Data Library
        </button>
        <h1 className="ml-auto text-2xl font-bold">Sensor Data Analysis</h1>
      </div>

      {sensorData.length === 0 ? (
        <p className="text-gray-600">No sensor data available for analysis.</p>
      ) : (
        <div>
          {renderCharts()}
        </div>
      )}
    </div>
  );
};

export default SensorDataPage;
