import React, { useState, useRef, useEffect } from "react";
import {

  ChevronDownIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  PaintBrushIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,



 } from "@heroicons/react/24/outline";

import LoginPageChatgpt from "../../pages/LoginPageChatgpt";
import RegisterPageChatgpt from "../../pages/RegisterPageChatgpt";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const gptRef = useRef(null);
    const settingsRef = useRef(null);

    const closeModals = () => {
        setShowLogin(false);
        setShowSignup(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (gptRef.current && !gptRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSettings(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="w-full bg-gray-900 border-b border-gray-800">
                <div className="flex items-center justify-between 
                px-3 sm:px-6 md:px-8 
                py-3 md:py-4">

                    {/* LEFT */}
                    <div
                        className="flex items-center gap-2 sm:gap-3 relative"
                        ref={gptRef}
                    >
                        <div className="flex items-center justify-center
                        w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9
                        bg-emerald-500 rounded-lg
                        text-white font-bold
                        text-xs sm:text-sm md:text-base">
                            G
                        </div>

                        {/* Hide on very small screens */}
                        <h1 className="hidden sm:block
                        text-sm sm:text-base md:text-lg
                        font-semibold text-white">
                            ChatGPT Clone
                        </h1>

                        <button
                            onClick={() => {
                                setShowDropdown((prev) => !prev);
                                setShowSettings(false);
                            }}
                            className="flex items-center
                            px-2 sm:px-3 md:px-4
                            py-1 sm:py-1.5
                            text-xs sm:text-sm md:text-base
                            text-gray-300
                            bg-gray-800
                            rounded-md
                            hover:bg-gray-700
                            transition"
                        >
                            GPT-4
                            <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </button>

                        {showDropdown && (
  <div
    className="absolute
    top-12 sm:top-14
    left-0
    w-44 sm:w-52
    backdrop-blur-lg
    bg-linear-to-b from-gray-800/95 to-gray-900/95
    border border-gray-700/60
    rounded-xl
    shadow-2xl
    p-2
    space-y-1
    z-50
    animate-fadeIn"
  >

    {/* Login */}
    <button
      onClick={() => {
        setShowLogin(true);
        setShowDropdown(false);
      }}
      className="flex items-center gap-2
      w-full text-left
      px-3 py-2
      text-xs sm:text-sm
      text-gray-300
      hover:bg-gray-700/70
      rounded-lg
      transition"
    >
      <ArrowRightOnRectangleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      Login
    </button>

    {/* Sign Up */}
    <button
      onClick={() => {
        setShowSignup(true);
        setShowDropdown(false);
      }}
      className="flex items-center gap-2
      w-full text-left
      px-3 py-2
      text-xs sm:text-sm
      text-white
      bg-linear-to-r
      from-emerald-600
      to-emerald-500
      hover:from-emerald-500
      hover:to-emerald-400
      rounded-lg
      transition
      font-medium"
    >
      <UserPlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      Sign up for free
    </button>
  </div>
)}
                    </div>

                    {/* RIGHT */}
                    <div
                        className="flex items-center gap-2 sm:gap-4 relative"
                        ref={settingsRef}
                    >
                        <button
                            onClick={() => setShowLogin(true)}
                            className="hidden md:block
                            text-gray-300 hover:text-white
                            transition
                            text-sm md:text-base"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setShowSignup(true)}
                            className="px-3 sm:px-4 md:px-5
                            py-1.5 sm:py-2
                            bg-emerald-600
                            text-white
                            rounded-md
                            hover:bg-emerald-500
                            transition
                            font-medium
                            text-xs sm:text-sm md:text-base"
                        >
                            Sign up
                        </button>

                        <button
                            onClick={() => {
                                setShowSettings((prev) => !prev);
                                setShowDropdown(false);
                            }}
                            className="flex items-center
                            px-2 sm:px-3 md:px-4
                            py-1 sm:py-1.5
                            text-xs sm:text-sm md:text-base
                            text-gray-300
                            bg-gray-800
                            rounded-md
                            hover:bg-gray-700
                            transition"
                        >
                            <Cog6ToothIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />

                            <span className="hidden sm:inline">Settings</span>

                            <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </button>

                        {showSettings && (
  <div
    className="absolute top-12 sm:top-14 right-0
    w-44 sm:w-56
    bg-gray-800 border border-gray-700
    rounded-lg shadow-lg p-2 space-y-1 z-50"
  >
    <button
      onClick={() => {
        setShowLogin(true);
        setShowSettings(false);
      }}
      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 rounded-md"
    >
      <UserCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      Profile
    </button>

    <button
      onClick={() => {
        setShowLogin(true);
        setShowSettings(false);
      }}
      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 rounded-md"
    >
      <PaintBrushIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      Theme Settings
    </button>

    <button
      onClick={() => {
        setShowLogin(true);
        setShowSettings(false);
      }}
      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 rounded-md"
    >
      <CreditCardIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      Manage Subscription
    </button>

    <div className="border-t border-gray-700 my-2"></div>

    <button
      onClick={() => {
        setShowLogin(true);
        setShowSettings(false);
      }}
      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs sm:text-sm text-red-400 hover:bg-gray-700 rounded-md"
    >
      <ArrowRightOnRectangleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      Logout
    </button>
  </div>
)}
                    </div>
                </div>
            </header>

            {(showLogin || showSignup) && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-gray-900 w-full max-w-md rounded-xl p-6 sm:p-8 shadow-2xl relative">
                        <button
                            onClick={closeModals}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>

                        {showLogin && (
                            <LoginPageChatgpt onSuccess={closeModals} />
                        )}

                        {showSignup && (
                            <RegisterPageChatgpt
                                onSuccess={closeModals}
                                switchToLogin={() => {
                                    setShowSignup(false);
                                    setShowLogin(true);
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;