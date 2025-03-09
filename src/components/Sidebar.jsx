import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaVideo,
  FaQuestionCircle,
  FaUserMd,
  FaCalendarAlt,
  FaLifeRing,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open/close state
  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay when the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleSidebarToggle}
        ></div>
      )}

      {/* Sidebar Toggle Button */}
      <button
        onClick={handleSidebarToggle}
        className="fixed top-3 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-md"
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-green-100 text-gray-900 shadow-lg transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex flex-col items-start p-6 space-y-4">
          {/* Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 w-full p-3 rounded-md ${
                isActive ? "bg-green-600 text-white" : "hover:bg-green-200"
              }`
            }
          >
            <FaHome size={20} />
            <span className="text-lg">Home</span>
          </NavLink>

          {/* Teleconsultation */}
          <NavLink
            to="/waiting-screen"
            className={({ isActive }) =>
              `flex items-center space-x-3 w-full p-3 rounded-md ${
                isActive ? "bg-green-600 text-white" : "hover:bg-green-200"
              }`
            }
          >
            <FaVideo size={20} />
            <span className="text-lg">Teleconsultation</span>
          </NavLink>

          {/* Patient Records */}
          <NavLink
            to="/patient-records"
            className={({ isActive }) =>
              `flex items-center space-x-3 w-full p-3 rounded-md ${
                isActive ? "bg-green-600 text-white" : "hover:bg-green-200"
              }`
            }
          >
            <FaUserMd size={20} />
            <span className="text-lg">Patient Records</span>
          </NavLink>

          {/* Queries */}
          <NavLink
            to="/queries"
            className={({ isActive }) =>
              `flex items-center space-x-3 w-full p-3 rounded-md ${
                isActive ? "bg-green-600 text-white" : "hover:bg-green-200"
              }`
            }
          >
            <FaQuestionCircle size={20} />
            <span className="text-lg">Queries</span>
          </NavLink>

          {/* Bookings */}
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center space-x-3 w-full p-3 rounded-md ${
                isActive ? "bg-green-600 text-white" : "hover:bg-green-200"
              }`
            }
          >
            <FaCalendarAlt size={20} />
            <span className="text-lg">Bookings</span>
          </NavLink>

          {/* Support Services */}
          <NavLink
            to="/support-services"
            className={({ isActive }) =>
              `flex items-center space-x-3 w-full p-3 rounded-md ${
                isActive ? "bg-green-600 text-white" : "hover:bg-green-200"
              }`
            }
          >
            <FaLifeRing size={20} />
            <span className="text-lg">Support Services</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};


export default Sidebar;
