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
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-6">

      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6 sm:mb-8 text-center">
        Create your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

        {/* Name */}
        <div>
          <label className="block text-gray-300 mb-1 text-xs sm:text-sm">
            Name
          </label>

          <div className="relative">

            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="
              w-full
              pl-10 pr-4
              py-2.5 sm:py-3
              text-sm sm:text-base
              placeholder:text-xs sm:placeholder:text-sm
              bg-gray-800 text-white
              rounded-lg
              border border-gray-700
              focus:ring-2 focus:ring-emerald-500
              focus:outline-none
              transition
              "
            />

          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-1 text-xs sm:text-sm">
            Email
          </label>

          <div className="relative">

            <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="
              w-full
              pl-10 pr-4
              py-2.5 sm:py-3
              text-sm sm:text-base
              placeholder:text-xs sm:placeholder:text-sm
              bg-gray-800 text-white
              rounded-lg
              border border-gray-700
              focus:ring-2 focus:ring-emerald-500
              focus:outline-none
              transition
              "
            />

          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 mb-1 text-xs sm:text-sm">
            Password
          </label>

          <div className="relative">

            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="
              w-full
              pl-10 pr-4
              py-2.5 sm:py-3
              text-sm sm:text-base
              placeholder:text-xs sm:placeholder:text-sm
              bg-gray-800 text-white
              rounded-lg
              border border-gray-700
              focus:ring-2 focus:ring-emerald-500
              focus:outline-none
              transition
              "
            />

          </div>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="
          w-full
          py-2.5 sm:py-3
          text-sm sm:text-base
          bg-emerald-600
          text-white
          rounded-lg
          font-semibold
          hover:bg-emerald-500
          transition
          disabled:opacity-60
          "
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </form>

      {/* Switch Login */}
      <p className="text-center text-gray-400 mt-6 text-xs sm:text-sm">
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