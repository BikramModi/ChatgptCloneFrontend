import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

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
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="relative w-full bg-gray-900 border-b border-gray-800">
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">

                    {/* LEFT SECTION */}
                    <div className="flex items-center space-x-2 sm:space-x-3 relative" ref={gptRef}>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-emerald-500 rounded-lg font-bold text-white text-sm sm:text-base">
                            G
                        </div>

                        {/* Hide text on small screens */}
                        <h1 className="hidden sm:block text-base sm:text-lg font-semibold text-white">
                            ChatGPT Clone
                        </h1>

                        <button
                            onClick={() => {
                                setShowDropdown((prev) => !prev);
                                setShowSettings(false);
                            }}
                            className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                        >
                            GPT-4
                            <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </button>

                        {showDropdown && (
                            <div className="absolute top-12 sm:top-14 left-0 w-44 sm:w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2 space-y-2 z-50">
                                <button
                                    onClick={() => {
                                        setShowLogin(true);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => {
                                        setShowSignup(true);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 rounded-md"
                                >
                                    Sign up for free
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex items-center space-x-2 sm:space-x-4 relative" ref={settingsRef}>

                        {/* Hide login text on very small screens */}
                        <button
                            onClick={() => setShowLogin(true)}
                            className="hidden sm:block text-gray-300 hover:text-white transition text-sm"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setShowSignup(true)}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition font-medium text-xs sm:text-sm"
                        >
                            Sign up
                        </button>

                        <button
                            onClick={() => {
                                setShowSettings((prev) => !prev);
                                setShowDropdown(false);
                            }}
                            className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                        >
                            <Cog6ToothIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Settings</span>
                            <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </button>

                        {showSettings && (
                            <div className="absolute top-12 sm:top-14 right-0 w-48 sm:w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2 space-y-1 z-50">
                                <button className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                                    Profile
                                </button>

                                <button className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                                    Theme Settings
                                </button>

                                <button className="w-full text-left px-3 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                                    Manage Subscription
                                </button>

                                <div className="border-t border-gray-700 my-2"></div>

                                <button className="w-full text-left px-3 py-2 text-xs sm:text-sm text-red-400 hover:bg-gray-700 rounded-md">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* MODAL */}
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