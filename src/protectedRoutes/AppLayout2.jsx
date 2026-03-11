import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppNavbar2 from "./AppNavbar2";

const AppLayout2 = () => {
  // Sidebar open state (default open on desktop, closed on mobile)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // open on large screens
      } else {
        setSidebarOpen(false); // collapse on small screens
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar width classes
  const sidebarWidthClass = sidebarOpen ? "w-64" : "w-16";

  return (
    <div className="h-screen bg-gray-900 flex relative">

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full bg-[#202123] text-gray-200 z-40
          transition-all duration-300
          ${sidebarWidthClass}
        `}
      >
        <AppNavbar2 open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`
          flex-1 h-screen overflow-y-auto transition-all duration-300
          ${windowWidth >= 1024 ? `ml-${sidebarOpen ? "64" : "16"}` : "ml-16"}
        `}
      >
        {/* Pass sidebarOpen prop to pages so they can adjust margin if needed */}
        <Outlet context={{ sidebarOpen }} />
      </div>
    </div>
  );
};

export default AppLayout2;