import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth";

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

      // Option 1: Close modal
      if (onSuccess) onSuccess();

      // Option 2 (Better UX): Switch to login
      if (switchToLogin) switchToLogin();

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Create your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-3 bg-emerald-600 rounded-lg text-white font-semibold
          hover:bg-emerald-500 transition disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Switch to Login */}
      <p className="text-center text-gray-400 mt-4 text-sm">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-emerald-400 hover:underline"
        >
          Login
        </button>
      </p>
    </>
  );
};

export default RegisterPageChatgpt;