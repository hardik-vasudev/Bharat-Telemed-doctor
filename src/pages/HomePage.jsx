import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaVideo, 
  FaUserMd, 
  FaQuestionCircle, 
  FaCalendarAlt, 
  FaLifeRing,
  FaChartBar
} from "react-icons/fa";


const HomePage = () => {
  // Dummy doctor details (replace with dynamic data as needed)
  const doctor = {
    name: "Dr. Aryan Sharma",
    profession: "Cardiologist",
    experience: "15 years experience",
    id: "BT-1234567",
  };

  // Dummy data for teleconsultation requests
  const teleconsultRequests = [
    { id: 1, time: "10:00 AM", status: "Pending" },
    { id: 2, time: "10:30 AM", status: "Pending" },
    { id: 3, time: "11:00 AM", status: "Emergency" },
  ];

  // Analytics data
  const totalRequests = teleconsultRequests.length;
  const pendingRequests = teleconsultRequests.filter(req => req.status === "Pending").length;
  const emergencyRequests = teleconsultRequests.filter(req => req.status === "Emergency").length;

  // Function to return common styling for navigation items
  const navItemClasses = (isActive, bgColor) =>
    `flex items-center space-x-3 w-full p-3 rounded-md ${
      isActive ? `${bgColor} text-white` : "hover:bg-gray-200 text-gray-800"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Doctor Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-bold text-gray-800">{doctor.name}</p>
            <p className="text-sm text-gray-600">{doctor.profession}</p>
            <p className="text-sm text-gray-600">{doctor.experience}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
            <p className="text-xs font-semibold">ID: {doctor.id}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <nav className="lg:col-span-1 bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Navigation
          </h2>

          <NavLink
            to="/waiting-screen"
            className={({ isActive }) => navItemClasses(isActive, "bg-blue-600")}
          >
            <FaVideo size={20} />
            <span>Teleconsultation</span>
          </NavLink>

          <NavLink
            to="/patient-records"
            className={({ isActive }) => navItemClasses(isActive, "bg-green-600")}
          >
            <FaUserMd size={20} />
            <span>Patient Records</span>
          </NavLink>

          <NavLink
            to="/queries"
            className={({ isActive }) => navItemClasses(isActive, "bg-purple-600")}
          >
            <FaQuestionCircle size={20} />
            <span>Queries</span>
          </NavLink>

          <NavLink
            to="/bookings"
            className={({ isActive }) => navItemClasses(isActive, "bg-yellow-600")}
          >
            <FaCalendarAlt size={20} />
            <span>Bookings</span>
          </NavLink>

          <NavLink
            to="/support-services"
            className={({ isActive }) => navItemClasses(isActive, "bg-red-600")}
          >
            <FaLifeRing size={20} />
            <span>Support Services</span>
          </NavLink>
        </nav>

        {/* Main Dashboard Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6 flex items-center">
              <FaChartBar className="text-blue-600 mr-4" size={30} />
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <p className="text-2xl font-bold text-gray-800">{totalRequests}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex items-center">
              <FaChartBar className="text-yellow-600 mr-4" size={30} />
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-800">{pendingRequests}</p>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6 flex items-center">
              <FaChartBar className="text-red-600 mr-4" size={30} />
              <div>
                <p className="text-sm text-gray-500">Emergency</p>
                <p className="text-2xl font-bold text-gray-800">{emergencyRequests}</p>
              </div>
            </div>
          </div>

          {/* Teleconsultation Requests Table */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Teleconsultation Requests
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teleconsultRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {`BT-REQ-${req.id.toString().padStart(3, "0")}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {req.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            req.status === "Emergency"
                              ? "bg-red-100 text-red-800"
                              : req.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                          Join
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Consultation Analytics Placeholder */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Consultation Analytics
            </h2>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-gray-500">[Graph/Chart Placeholder]</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
