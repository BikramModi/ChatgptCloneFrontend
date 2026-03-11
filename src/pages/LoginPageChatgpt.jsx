import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { loginUser } from "../api/auth";

const LoginPageChatgpt = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      login(data.user);

      toast.success("Logged in successfully 🎉");

      if (onSuccess) onSuccess();

      if (data.user.role === "user") {
        navigate("/user-dashboard");
      } else {
        navigate("/seller/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">

      {/* HEADER */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6 sm:mb-8 text-center">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

        {/* EMAIL */}
        <div>
          <label className="text-xs sm:text-sm text-gray-300">
            Email
          </label>

          <div className="relative mt-1">

            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
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

        {/* PASSWORD */}
        <div>

          <label className="text-xs sm:text-sm text-gray-300">
            Password
          </label>

          <div className="relative mt-1">

            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="
              w-full
              pl-10 pr-10
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

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-gray-400 hover:text-gray-200
              transition
              "
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* SUBMIT BUTTON */}
        <button
          disabled={loading}
          className="
          w-full
          flex items-center justify-center gap-2
          py-2.5 sm:py-3
          text-sm sm:text-base
          bg-emerald-600 text-white
          rounded-lg
          font-semibold
          hover:bg-emerald-500
          transition
          disabled:opacity-60
          "
        >

          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Login
            </>
          )}

        </button>

      </form>

    </div>
  );
};

export default LoginPageChatgpt;