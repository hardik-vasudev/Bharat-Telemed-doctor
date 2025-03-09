import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


const Layout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        {/* Topbar Component */}
        <Topbar />

        {/* Main Page Content */}
        <div className="flex-grow p-4">
          <Outlet /> {/* Renders the child components based on the route */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
