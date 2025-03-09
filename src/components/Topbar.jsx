import React from "react";
import { FaUserMd } from "react-icons/fa"; // Ensure react-icons is installed
import logo from "../assets/logo.png";


const TopBar = () => {
  return (
    <div className="w-full bg-green-50 shadow-md border-b border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <img src={logo} alt="Bharat-Telemed Logo" className="h-10" />
        <div className="flex items-center">
          <FaUserMd className="text-green-700 mr-2" size={24} />
          <h1 className="text-xl font-bold text-green-800">Bharat-Telemed</h1>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
