import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbarLayout from "./SideNavbarLayout"; // your sidebar component

const AppLayout1 = () => {
  return (
    <div className="flex h-dvh overflow-hidden bg-gray-900">

      {/* Sidebar */}
      <SideNavbarLayout />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <Outlet />
      </div>

    </div>
  );
};

export default AppLayout1;