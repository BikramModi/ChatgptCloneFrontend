import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Box,
  Tags,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X
} from "lucide-react";

import useAuth from "../hooks/useAuth";

const AdminNavbar2 = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const menuItems = [
    {
      name: "Content Moderation",
      icon: <LayoutDashboard size={20} />,
      path: "/seller/dashboard",
    },
   
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/users",
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`h-screen bg-[#202123] text-gray-200 flex flex-col transition-all duration-300 ${
          open ? "w-64" : "w-16"
        }`}
      >
        {/* Top */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {open && <h1 className="font-semibold text-lg">Admin Panel</h1>}

          <button onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              {item.icon}
              {open && <span>{item.name}</span>}
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
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
                {user?.name?.charAt(0) || "A"}
              </div>

              {open && (
                <div className="flex flex-col text-sm">
                  <span>{user?.name || "Admin"}</span>
                  <span className="text-xs text-gray-400">Admin</span>
                </div>
              )}
            </div>

            {open && <LogOut size={18} />}
          </div>
        </div>
      </div>

      {/* Logout Dialog */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-3">Confirm Logout</h2>

            <p className="text-gray-600 text-sm mb-5">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
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