import React, { useState, useRef, useEffect } from "react";
import {
    ShareIcon,
    EllipsisVerticalIcon,
    LinkIcon,
    DocumentDuplicateIcon,
    TrashIcon,
    PencilSquareIcon,
    ExclamationCircleIcon,
    ChevronDownIcon,
    SparklesIcon,
    CpuChipIcon,
} from "@heroicons/react/24/outline";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatGPTLayout = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    const modelRef = useRef(null);
    const moreRef = useRef(null);

    const [showModelMenu, setShowModelMenu] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    // ================= CLOSE DROPDOWN ON OUTSIDE CLICK =================
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close model menu
            if (
                modelRef.current &&
                !modelRef.current.contains(event.target)
            ) {
                setShowModelMenu(false);
            }

            // Close more menu
            if (
                moreRef.current &&
                !moreRef.current.contains(event.target)
            ) {
                setShowMoreMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [input]);

    // ================= CREATE CONVERSATION =================
    const createConversation = async () => {
        const res = await fetch("http://localhost:6005/conversations", {
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

        // Add user + assistant placeholder in ONE state update
        setMessages((prev) => [
            ...prev,
            { sender: "user", content: userText },
            { sender: "assistant", content: "" },
        ]);

        setIsStreaming(true);

        const response = await fetch(
            `http://localhost:6005/messages/conversations/${convId}/messages`,
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

                // ✅ Add space only if needed
                if (
                    assistantText.length > 0 &&
                    !assistantText.endsWith(" ") &&
                    ![".", ",", "!", "?", ":", ";"].includes(word)
                ) {
                    assistantText += " ";
                }

                assistantText += word;

                // ✅ Create paragraph after sentence endings
                let formattedText = assistantText
                    .replace(/([.!?])\s+/g, "$1\n\n")
                    .replace(/\n\n+/g, "\n\n");

                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].content = formattedText;
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

    return (
        <div className="flex flex-col h-screen w-full bg-gray-900 text-white">

            {/* ================= HEADER ================= */}
            <header className="sticky top-0 z-10 flex items-center justify-between px-3 sm:px-6 py-3 border-b border-gray-800 bg-gray-900">

                {/* LEFT - Model */}
                <div className="relative" ref={modelRef}>
                    <button
                        onClick={() => setShowModelMenu(!showModelMenu)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm sm:text-base"
                    >
                        <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                        <span className="font-medium">ChatGPT</span>
                        <ChevronDownIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded-lg text-yellow-400 text-xs sm:text-sm">
                        <ExclamationCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        Memory Full
                    </div>

                    <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                        Share
                    </button>
                </div>
            </header>

            {/* ================= CHAT BODY ================= */}
            <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4">
                <div className="max-w-full sm:max-w-3xl mx-auto space-y-5">

                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`px-4 py-3 rounded-2xl text-sm sm:text-base md:text-[17px] leading-relaxed whitespace-pre-wrap break-words max-w-[85%] sm:max-w-[75%] ${msg.sender === "user"
                                        ? "bg-emerald-600 rounded-br-md"
                                        : "bg-gray-800 rounded-bl-md"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isStreaming && (
                        <div className="text-gray-400 text-xs sm:text-sm animate-pulse">
                            Assistant is typing...
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            {/* ================= INPUT ================= */}
            <div className="border-t border-gray-800 p-3 sm:p-4 bg-gray-900">
                <div className="max-w-full sm:max-w-3xl mx-auto flex items-end gap-2 sm:gap-3">

                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Message ChatGPT..."
                        rows={1}
                        className="flex-1 resize-none px-4 py-3 rounded-xl bg-gray-800 focus:outline-none text-sm sm:text-base max-h-40 overflow-y-auto"
                    />

                    <button
                        onClick={handleSend}
                        className="px-4 sm:px-5 py-2.5 bg-emerald-600 rounded-xl text-sm sm:text-base hover:bg-emerald-500 transition"
                    >
                        Send
                    </button>
                </div>
            </div>

        </div>
    );

};

export default ChatGPTLayout;