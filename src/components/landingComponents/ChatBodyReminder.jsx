import React, { useState, useEffect } from "react";

const TimedLoginReminder = ({ onLoginClick, onSignupClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 15000); // 15 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex justify-between items-center bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-md mb-3 mx-4">
      <p className="text-sm">
        Want to save your chats and get full access? Login or sign up now!
      </p>
      <div className="flex space-x-2">
        <button
          onClick={onLoginClick}
          className="px-3 py-1 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Login
        </button>
        <button
          onClick={onSignupClick}
          className="px-3 py-1 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Sign Up
        </button>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="ml-3 text-white hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
};

export default TimedLoginReminder;