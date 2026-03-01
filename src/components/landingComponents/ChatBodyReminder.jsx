import React, { useState, useEffect } from "react";

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
        bg-emerald-600
        text-white
        rounded-lg
        shadow-md
        p-3 sm:p-4
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
        {/* Message */}
        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
          Want to save your chats and get full access?
          <span className="block sm:inline">
            {" "}Login or sign up now!
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={onLoginClick}
            className="
              px-3 sm:px-4
              py-1.5
              text-xs sm:text-sm
              bg-white
              text-emerald-600
              font-semibold
              rounded-lg
              hover:bg-gray-200
              transition
            "
          >
            Login
          </button>

          <button
            onClick={onSignupClick}
            className="
              px-3 sm:px-4
              py-1.5
              text-xs sm:text-sm
              bg-white
              text-emerald-600
              font-semibold
              rounded-lg
              hover:bg-gray-200
              transition
            "
          >
            Sign Up
          </button>

          {/* Close Button */}
          <button
            onClick={() => setVisible(false)}
            className="
              px-2
              text-sm sm:text-base
              font-bold
              hover:text-gray-200
            "
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimedLoginReminder;