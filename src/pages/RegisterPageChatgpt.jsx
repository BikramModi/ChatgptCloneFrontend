import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth";

import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const RegisterPageChatgpt = ({ onSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Registered successfully 🎉");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      if (onSuccess) onSuccess();
      if (switchToLogin) switchToLogin();

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8 py-6">
      
      {/* Title */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-6 text-center">
        Create your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

{/* Name */}
<div>
  <label className="block text-gray-300 mb-1 text-sm sm:text-base">
    Name
  </label>

  <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
    <UserIcon className="w-5 h-5 text-gray-400 mr-2" />

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your name"
      className="w-full bg-transparent text-white outline-none text-sm sm:text-base"
    />
  </div>
</div>

{/* Email */}
<div>
  <label className="block text-gray-300 mb-1 text-sm sm:text-base">
    Email
  </label>

  <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
    <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-2" />

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email"
      className="w-full bg-transparent text-white outline-none text-sm sm:text-base"
    />
  </div>
</div>

{/* Password */}
<div>
  <label className="block text-gray-300 mb-1 text-sm sm:text-base">
    Password
  </label>

  <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-500">
    <LockClosedIcon className="w-5 h-5 text-gray-400 mr-2" />

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Enter your password"
      className="w-full bg-transparent text-white outline-none text-sm sm:text-base"
    />
  </div>
</div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full py-2.5 sm:py-3 bg-emerald-600 rounded-lg text-white 
          font-semibold text-sm sm:text-base
          hover:bg-emerald-500 transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Switch Login */}
      <p className="text-center text-gray-400 mt-5 text-xs sm:text-sm">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-emerald-400 hover:underline font-medium"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterPageChatgpt;