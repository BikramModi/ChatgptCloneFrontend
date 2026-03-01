import React, { useState, useRef, useEffect } from "react";
import {
    PaperClipIcon,
    MagnifyingGlassIcon,
    BookOpenIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline";

import TimedLoginReminder from "./ChatBodyReminder";
import LoginPageChatgpt from "../../pages/LoginPageChatgpt";
import RegisterPageChatgpt from "../../pages/RegisterPageChatgpt";

const ChatBody = ({ navbarHeight = 72 }) => {
    const [messages, setMessages] = useState([
        { sender: "assistant", text: "Hello! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);
    const textareaRef = useRef(null);

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    /* ================= Auto Focus On Load ================= */
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    /* ================= Auto Scroll ================= */
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { sender: "user", text: input }]);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: `You said: "${input}"` },
            ]);
        }, 1000);

        setInput("");

        // Refocus textarea after sending
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const closeModals = () => {
        setShowLogin(false);
        setShowSignup(false);

        // Refocus after modal closes
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
            }
        }, 0);
    };

    return (
        <div className="flex justify-center bg-gray-900 min-h-screen relative">
            <div
                className="flex flex-col w-full max-w-4xl px-3 sm:px-6"
                style={{ height: `calc(100vh - ${navbarHeight}px)` }}
            >
                {/* ================= Messages ================= */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto py-4 sm:py-6 space-y-4"
                    style={{ minHeight: 0 }}
                >
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${
                                msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`
                                    max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]
                                    px-3 sm:px-4 py-2
                                    text-sm sm:text-base
                                    rounded-lg
                                    ${
                                        msg.sender === "user"
                                            ? "bg-emerald-600 text-white rounded-br-none"
                                            : "bg-gray-800 text-gray-100 rounded-bl-none"
                                    }
                                `}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= Bottom Section ================= */}
                <div className="flex-shrink-0 bg-gray-800 border-t border-gray-700 p-3 sm:p-4">
                    <TimedLoginReminder
                        onLoginClick={() => setShowLogin(true)}
                        onSignupClick={() => setShowSignup(true)}
                    />

                    {/* Input */}
                    <div className="flex items-center mt-2">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            rows={1}
                            className="
                                flex-1 resize-none
                                px-3 sm:px-4 py-2
                                text-sm sm:text-base
                                rounded-lg
                                bg-gray-700 text-white
                                focus:outline-none focus:ring-2 focus:ring-emerald-500
                            "
                        />
                        <button
                            onClick={handleSend}
                            className="
                                ml-2 sm:ml-3
                                px-3 sm:px-4 py-2
                                text-sm sm:text-base
                                bg-emerald-600 hover:bg-emerald-500
                                rounded-lg text-white font-medium transition
                            "
                        >
                            Send
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex mt-3 gap-2 flex-wrap">
                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <PaperClipIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Attach</span>
                        </button>

                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Search</span>
                        </button>

                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Study</span>
                        </button>

                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <PhotoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Create Image</span>
                        </button>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center mt-2 text-xs sm:text-sm text-gray-400 px-2">
                    ⚠️ This assistant may occasionally generate incorrect
                    information. Always double-check important details.
                </p>
            </div>

            {/* ================= Modal ================= */}
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
        </div>
    );
};

export default ChatBody;