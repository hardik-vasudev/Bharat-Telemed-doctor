
import { FaTemperatureHigh, FaHeartbeat, FaStethoscope } from "react-icons/fa";
import { GiSugarCane } from "react-icons/gi";

export const sensors = [
  { id: "temperature", icon: <FaTemperatureHigh size={30} className="text-red-500" />, label: "Temperature" },
  { id: "sugar", icon: <GiSugarCane size={30} className="text-orange-500" />, label: "Sugar Level" },
  { id: "heartRate", icon: <FaHeartbeat size={30} className="text-pink-500" />, label: "Heart Rate" },
  { id: "bloodPressure", icon: <FaStethoscope size={30} className="text-green-500" />, label: "Blood Pressure" },
];

export const generateRandomValue = (sensor) => {
  switch (sensor) {
    case "temperature":
      return (Math.random() * 2 + 36).toFixed(1);
    case "sugar":
      return Math.floor(Math.random() * 40 + 80);
    case "heartRate":
      return Math.floor(Math.random() * 30 + 60);
    case "bloodPressure":
      return `${Math.floor(Math.random() * 20 + 110)}/${Math.floor(Math.random() * 10 + 70)}`;
    default:
      return "N/A";
  }
};
