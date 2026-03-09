import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar2 from "./AppNavbar2";

const AppLayout2 = () => {
  return (
    <div className="h-screen bg-gray-900 flex">

      {/* Sidebar */}
      <div className="">
        <AppNavbar2 />
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default AppLayout2;