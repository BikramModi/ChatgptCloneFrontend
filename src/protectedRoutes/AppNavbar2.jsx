import React from "react";
import { NavLink, useNavigate, } from "react-router-dom";
import { useState } from "react";

import useAuth from "../hooks/useAuth";
import { LayoutDashboard, Box, Tags, ShoppingCart, Users, LogOut } from "lucide-react";

const AdminNavbar2 = () => {
  const { logout, user } = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to landing page
  };

  
  return (
    <nav className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md sticky top-0 z-50">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <img src="https://w7.pngwing.com/pngs/384/470/png-transparent-retail-computer-icons-e-commerce-sales-mega-offer-miscellaneous-service-logo-thumbnail.png" alt="Logo" className="w-8 h-8 rounded-full " />
        <h1 className="text-xl font-bold text-purple-400">E-Shop Admin</h1>
      </div>

      {/* Middle: Navigation Links */}
      <div className="flex gap-6">
        <NavLink
          to="/seller/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-purple-400 ${
              isActive ? "text-purple-400 font-semibold" : ""
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>



        <NavLink
          to="/seller/category"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-purple-400 ${
              isActive ? "text-purple-400 font-semibold" : ""
            }`
          }
        >
          <Tags size={18} />
          Categories
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-purple-400 ${
              isActive ? "text-purple-400 font-semibold" : ""
            }`
          }
        >
          <ShoppingCart size={18} />
          Orders
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center gap-2 hover:text-purple-400 ${
              isActive ? "text-purple-400 font-semibold" : ""
            }`
          }
        >
          <Users size={18} />
          Users
        </NavLink>
      </div>

      {/* Right: User + Logout */}
      <div className="flex items-center justify-center gap-4">
        <span className=" h-13 w-13 rounded-full bg-green-600 flex items-center justify-center text-sm text-gray-300">{user?.name || "Admin"}</span>
        <button className="flex items-center gap-1"
         variant="destructive" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar2;
