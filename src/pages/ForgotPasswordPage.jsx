import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");

    toast.success("Reset code sent to your email 📩");
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!code || !password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    toast.success("Password reset successful 🚀");

    setStep(1);
    setEmail("");
    setCode("");
    setPassword("");
    setConfirmPassword("");

    navigate("/login");
  };

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center
      bg-linear-to-br from-gray-950 via-gray-900 to-black
      px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md sm:max-w-lg
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Back Button */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 mb-6
          text-xs sm:text-sm font-medium text-gray-400
          hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-500/10 p-3 rounded-full">
              <MessageSquare size={28} className="text-emerald-400" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>

          <p className="text-sm sm:text-base text-gray-400 mt-2">
            {step === 1
              ? "Enter your email to receive a reset code"
              : "Enter the code and your new password"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              onSubmit={handleSendCode}
              className="space-y-5"
            >
              <div>
                <label className="text-sm text-gray-300">Email</label>
                <div className="relative mt-2">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3
                    bg-gray-900 border border-gray-700
                    text-white rounded-lg
                    text-sm sm:text-base
                    focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                className="w-full bg-emerald-500 hover:bg-emerald-600
                text-black font-semibold py-3 rounded-lg
                text-sm sm:text-base transition"
              >
                Send Reset Code
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form
              key="step2"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
              onSubmit={handleResetPassword}
              className="space-y-5"
            >
              {/* Code */}
              <div>
                <label className="text-sm text-gray-300">Reset Code</label>
                <div className="relative mt-2">
                  <KeyRound
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="6-digit code"
                    className="w-full pl-10 pr-4 py-3 text-center
                    bg-gray-900 border border-gray-700
                    text-white rounded-lg
                    text-sm sm:text-base
                    focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-300">New Password</label>
                <div className="relative mt-2">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full pl-10 pr-10 py-3
                    bg-gray-900 border border-gray-700
                    text-white rounded-lg
                    text-sm sm:text-base
                    focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-gray-300">
                  Confirm Password
                </label>
                <div className="relative mt-2">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-10 pr-10 py-3
                    bg-gray-900 border border-gray-700
                    text-white rounded-lg
                    text-sm sm:text-base
                    focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                className="w-full bg-emerald-500 hover:bg-emerald-600
                text-black font-semibold py-3 rounded-lg
                text-sm sm:text-base transition"
              >
                Reset Password
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ForgotPasswordPage;