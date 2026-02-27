import React, { useState, useRef, useEffect } from "react";
import {
    PaperClipIcon,
    MagnifyingGlassIcon,
    BookOpenIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline";

import MemoryFullBanner from "./ChatReminderLayout";
import LoginPageChatgpt from "../pages/LoginPageChatgpt";
import RegisterPageChatgpt from "../pages/RegisterPageChatgpt";

const ChatBodyLayout = ({ navbarHeight = 72 }) => {
    const [messages, setMessages] = useState([
        { sender: "assistant", text: "Hello! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { sender: "user", text: input }]);

        // Mock assistant response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: `You said: "${input}"` },
            ]);
        }, 1000);

        setInput("");
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
    };

    return (
        <div className="flex justify-center bg-gray-900 min-h-screen relative">
            {/* Chat container */}
            <div
                className="flex flex-col w-full max-w-2xl"
                style={{ height: `calc(100vh - ${navbarHeight}px)` }}
            >
                {/* Messages area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
                    style={{ minHeight: 0 }}
                >
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.sender === "user"
                                    ? "bg-emerald-600 text-white rounded-br-none"
                                    : "bg-gray-800 text-gray-100 rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fixed bottom section */}
                <div className="flex-shrink-0 bg-gray-800 border-t border-gray-700 p-4">
                    {/* Timed Login Reminder */}
                    <MemoryFullBanner
                        onManageClick={() => navigate("/settings/memory")}
                        onUpgradeClick={() => navigate("/pricing")}
                    />

                    {/* Input + Send Button */}
                    <div className="flex items-center mt-2">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            rows={1}
                            className="flex-1 resize-none px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                            onClick={handleSend}
                            className="ml-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-medium transition"
                        >
                            Send
                        </button>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex mt-3 space-x-3 justify-start flex-wrap">
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <PaperClipIcon className="w-5 h-5" />
                            Attach
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <MagnifyingGlassIcon className="w-5 h-5" />
                            Search
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <BookOpenIcon className="w-5 h-5" />
                            Study
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <PhotoIcon className="w-5 h-5" />
                            Create Image
                        </button>
                    </div>


                </div>

                {/* Disclaimer */}
                <p className="text-center mt-2 text-sm text-gray-400">
                    ⚠️ This assistant may occasionally generate incorrect information. Always double-check important details.
                </p>
            </div>

            {/* Login/Signup Modal */}
            {(showLogin || showSignup) && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-gray-900 w-full max-w-md rounded-xl p-8 shadow-2xl relative">
                        <button
                            onClick={closeModals}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>

                        {showLogin && <LoginPageChatgpt onSuccess={closeModals} />}
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

export default ChatBodyLayout;