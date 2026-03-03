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
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const scrollRef = useRef(null);
    const textareaRef = useRef(null);

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    // ================= AUTO FOCUS =================
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    // ================= AUTO SCROLL =================
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // ================= CREATE CONVERSATION =================
    const createConversation = async () => {
        const res = await fetch("http://localhost:6005/conversations/guest", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: "New Chat",
                model: "gpt-3.5-turbo",
                systemPrompt: "You are a helpful assistant.",
                visibility: "private",
                isArchived: false,
            }),
        });

        const data = await res.json();
        const convId = data?.data?._id || data?._id;
        setConversationId(convId);
        return convId;
    };

    // ================= SEND MESSAGE =================
    const handleSend = async () => {
        if (!input.trim() || isStreaming) return;

        let convId = conversationId;
        if (!convId) {
            convId = await createConversation();
        }

        const userText = input;
        setInput("");

        // Add user + assistant placeholder
        setMessages((prev) => [
            ...prev,
            { sender: "user", text: userText },
            { sender: "assistant", text: "" },
        ]);

        setIsStreaming(true);

        const response = await fetch(
            `http://localhost:6005/messages/conversations/${convId}/messages/guest`,
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: userText }),
            }
        );

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let assistantText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (let line of lines) {
                if (!line.startsWith("data:")) continue;

                let word = line.replace("data:", "").trim();

                if (word === "[DONE]") {
                    setIsStreaming(false);
                    return;
                }

                if (
                    assistantText.length > 0 &&
                    !assistantText.endsWith(" ") &&
                    ![".", ",", "!", "?", ":", ";"].includes(word)
                ) {
                    assistantText += " ";
                }

                assistantText += word;

                let formattedText = assistantText
                    .replace(/([.!?])\s+/g, "$1\n\n")
                    .replace(/\n\n+/g, "\n\n");

                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].text = formattedText;
                    return updated;
                });
            }
        }

        setIsStreaming(false);
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
        setTimeout(() => {
            textareaRef.current?.focus();
        }, 0);
    };

    return (
        <div className="flex justify-center bg-gray-900 h-full relative">
            <div
                className="flex flex-col w-full max-w-4xl px-3 sm:px-6"
                style={{ height: `calc(100vh - ${navbarHeight}px)` }}
            >
                {/* ================= MESSAGES ================= */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto py-4 sm:py-6 space-y-4"
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
                                className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]
                                px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg
                                ${
                                    msg.sender === "user"
                                        ? "bg-emerald-600 text-white rounded-br-none"
                                        : "bg-gray-800 text-gray-100 rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isStreaming && (
                        <div className="text-gray-400 text-xs animate-pulse">
                            Assistant is typing...
                        </div>
                    )}
                </div>

                {/* ================= INPUT SECTION ================= */}
                <div className="flex-shrink-0 bg-gray-800 border-t border-gray-700 p-3 sm:p-4">
                    <TimedLoginReminder
                        onLoginClick={() => setShowLogin(true)}
                        onSignupClick={() => setShowSignup(true)}
                    />

                    <div className="flex items-center mt-2">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            rows={1}
                            className="flex-1 resize-none px-3 sm:px-4 py-2
                            text-sm sm:text-base rounded-lg
                            bg-gray-700 text-white
                            focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                            onClick={handleSend}
                            className="ml-2 sm:ml-3 px-3 sm:px-4 py-2
                            text-sm sm:text-base bg-emerald-600
                            hover:bg-emerald-500 rounded-lg
                            text-white font-medium transition"
                        >
                            Send
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex mt-3 gap-2 flex-wrap">
                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <PaperClipIcon className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <MagnifyingGlassIcon className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <BookOpenIcon className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <PhotoIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= MODAL ================= */}
            {(showLogin || showSignup) && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-gray-900 w-full max-w-md rounded-xl p-6 shadow-2xl relative">
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