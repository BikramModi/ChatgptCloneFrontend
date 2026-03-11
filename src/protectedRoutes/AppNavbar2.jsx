import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react";
import useAuth from "../hooks/useAuth";

const AdminNavbar2 = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Sidebar open state: mobile default closed
  const [open, setOpen] = useState(window.innerWidth >= 1024); 
  const [showLogout, setShowLogout] = useState(false);

  const menuItems = [
    {
      name: "Content Moderation",
      icon: <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: "/seller/dashboard",
    },
    {
      name: "Users",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      path: "/users",
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative z-40 h-screen bg-[#202123] text-gray-200 flex flex-col
          transition-all duration-300
          ${open ? "w-64" : "w-16"}
        `}
      >
        {/* Top */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
          {open && (
            <h1 className="font-semibold text-sm sm:text-base md:text-lg">
              Admin Panel
            </h1>
          )}

          <button onClick={() => setOpen(!open)}>
            {open ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-sm sm:text-base rounded-md
                 hover:bg-gray-700 transition ${isActive ? "bg-gray-700" : ""}`
              }
            >
              {item.icon}
              {open && <span className="truncate">{item.name}</span>}
            </NavLink>
          ))}
        </div>

        {/* Bottom User Section */}
        <div className="border-t border-gray-700 p-3">
          <div
            className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-md"
            onClick={() => setShowLogout(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500 flex items-center justify-center text-black text-sm font-bold">
                {user?.name?.charAt(0) || "A"}
              </div>

              {open && (
                <div className="flex flex-col text-xs sm:text-sm truncate">
                  <span>{user?.name || "Admin"}</span>
                  <span className="text-gray-400 text-xs sm:text-sm">Admin</span>
                </div>
              )}
            </div>

            {open && <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />}
          </div>
        </div>
      </div>

     {/* Logout Dialog */}
{showLogout && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div className="bg-[#202123] rounded-lg p-5 sm:p-6 w-full max-w-sm shadow-lg border border-gray-700">
      
      {/* Title */}
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">
        Confirm Logout
      </h2>
      
      {/* Message */}
      <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-5">
        Are you sure you want to logout?
      </p>
      
      {/* Buttons */}
      <div className="flex justify-end gap-3">
        {/* Cancel Button */}
        <button
          onClick={() => setShowLogout(false)}
          className="
            px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base
            border border-gray-600 rounded-md
            hover:bg-gray-700 transition
            text-gray-200
          "
        >
          Cancel
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
            px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base
            bg-red-600 hover:bg-red-500 transition
            text-white rounded-md
          "
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default AdminNavbar2;