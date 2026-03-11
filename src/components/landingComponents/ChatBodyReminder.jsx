import React, { useState, useEffect } from "react";
import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const TimedLoginReminder = ({ onLoginClick, onSignupClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
      mx-2 sm:mx-0
      mb-3
      rounded-xl
      shadow-lg
      p-3 sm:p-4
      bg-linear-to-r
      from-emerald-600
      to-emerald-500
      text-white
      animate-fadeIn
      "
    >
      <div
        className="
        flex flex-col sm:flex-row
        sm:items-center
        sm:justify-between
        gap-3
        "
      >
        {/* LEFT MESSAGE */}
        <div className="flex items-start gap-2 sm:gap-3">

          <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 mt-0.5" />

          <p className="text-xs sm:text-sm md:text-base leading-relaxed">
            Want to save your chats and get full access?
            <span className="block sm:inline font-medium">
              {" "}Login or sign up now!
            </span>
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">

          <button
            onClick={onLoginClick}
            className="
            flex items-center gap-1.5
            px-3 sm:px-4
            py-1.5 sm:py-2
            text-xs sm:text-sm
            bg-white
            text-emerald-600
            font-semibold
            rounded-lg
            hover:bg-gray-200
            transition
            "
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Login
          </button>

          <button
            onClick={onSignupClick}
            className="
            flex items-center gap-1.5
            px-3 sm:px-4
            py-1.5 sm:py-2
            text-xs sm:text-sm
            bg-white
            text-emerald-600
            font-semibold
            rounded-lg
            hover:bg-gray-200
            transition
            "
          >
            <UserPlusIcon className="w-4 h-4" />
            Sign Up
          </button>

          {/* CLOSE */}
          <button
            onClick={() => setVisible(false)}
            className="
            p-1.5
            rounded-md
            hover:bg-white/20
            transition
            "
          >
            <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default TimedLoginReminder;