import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import LoginPageChatgpt from "../../pages/LoginPageChatgpt";
import RegisterPageChatgpt from "../../pages/RegisterPageChatgpt";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const dropdownRef = useRef(null);
    const settingsRef = useRef(null);

    const closeModals = () => {
        setShowLogin(false);
        setShowSignup(false);
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }

            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setShowSettings(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">

                {/* Left Section */}
                <div className="flex items-center space-x-3 relative" ref={dropdownRef}>

                    {/* Logo */}
                    <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-lg font-bold text-white">
                        G
                    </div>

                    <h1 className="text-lg font-semibold text-white hidden sm:block">
                        ChatGPT Clone
                    </h1>

                    {/* GPT Dropdown */}
                    <button
                        onClick={() => {
                            setShowDropdown(!showDropdown);
                            setShowSettings(false);
                        }}
                        className="flex items-center px-3 py-1.5 text-sm text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                    >
                        GPT-4
                        <ChevronDownIcon className="w-4 h-4 ml-2" />
                    </button>

                    {showDropdown && (
                        <div className="absolute top-14 left-0 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2 space-y-2 z-50">
                            <button
                                onClick={() => {
                                    setShowLogin(true);
                                    setShowDropdown(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => {
                                    setShowSignup(true);
                                    setShowDropdown(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-500 rounded-md"
                            >
                                Sign up for free
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 relative" ref={settingsRef}>

                    <button
                        onClick={() => setShowLogin(true)}
                        className="text-gray-300 hover:text-white transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setShowSignup(true)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition font-medium"
                    >
                        Sign up for free
                    </button>

                    {/* SETTINGS DROPDOWN BUTTON */}
                    <button
                        onClick={() => {
                            setShowSettings(!showSettings);
                            setShowDropdown(false);
                        }}
                        className="flex items-center px-3 py-1.5 text-sm text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                    >
                        <Cog6ToothIcon className="w-5 h-5 mr-2" />
                        Settings
                        <ChevronDownIcon className="w-4 h-4 ml-2" />
                    </button>

                    {/* SETTINGS DROPDOWN MENU */}
                    {showSettings && (
                        <div className="absolute top-14 right-0 w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-2 space-y-1 z-50">

                            <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                                Profile
                            </button>

                            <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                                Theme Settings
                            </button>

                            <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                                Manage Subscription
                            </button>

                            <div className="border-t border-gray-700 my-2"></div>

                            <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-md">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Overlay + Modal */}
            {(showLogin || showSignup) && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 w-full max-w-md rounded-xl p-8 shadow-2xl relative">

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