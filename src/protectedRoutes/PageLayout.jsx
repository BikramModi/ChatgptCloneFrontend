import React, { useState, useRef, useEffect } from "react";
import {
    ShareIcon,
    EllipsisVerticalIcon,
    LinkIcon,
    DocumentDuplicateIcon,
    TrashIcon,
    PencilSquareIcon,
    ExclamationCircleIcon,
    PaperClipIcon,
    MagnifyingGlassIcon,
    BookOpenIcon,
    PhotoIcon,
    ChevronDownIcon,
    SparklesIcon,
    CpuChipIcon,
} from "@heroicons/react/24/outline";

const ChatGPTLayout = () => {
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showModelMenu, setShowModelMenu] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "assistant", text: "Hello! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");

    const bottomRef = useRef(null);
    const moreRef = useRef(null);
    const modelRef = useRef(null);
    const textareaRef = useRef(null);

    /* Auto focus on load */
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    /* Auto scroll when messages change */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* Close dropdowns on outside click */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreRef.current && !moreRef.current.contains(event.target)) {
                setShowMoreMenu(false);
            }
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                setShowModelMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input;

        setMessages((prev) => [
            ...prev,
            { sender: "user", text: userMessage },
        ]);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "assistant", text: `You said: "${userMessage}"` },
            ]);
        }, 1000);

        setInput("");

        // Refocus textarea
        textareaRef.current?.focus();
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white w-full">

            {/* ================= HEADER ================= */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900 shrink-0">

                {/* LEFT - Model Dropdown */}
                <div className="relative" ref={modelRef}>
                    <button
                        onClick={() => setShowModelMenu(!showModelMenu)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                    >
                        <SparklesIcon className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-medium">ChatGPT</span>
                        <ChevronDownIcon className="w-4 h-4" />
                    </button>

                    {showModelMenu && (
                        <div className="absolute left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-2 space-y-1 z-50">
                            <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 rounded-md">
                                <SparklesIcon className="w-5 h-5 mr-3 text-emerald-400" />
                                GPT-4o
                            </button>
                            <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 rounded-md">
                                <CpuChipIcon className="w-5 h-5 mr-3 text-blue-400" />
                                GPT-4 Turbo
                            </button>
                            <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 rounded-md">
                                <SparklesIcon className="w-5 h-5 mr-3 text-purple-400" />
                                GPT-3.5
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center space-x-3">

                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded-lg text-yellow-400 text-sm whitespace-nowrap">
                        <ExclamationCircleIcon className="w-5 h-5" />
                        <span>Memory Full</span>
                    </div>

                    <button className="flex items-center px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 transition whitespace-nowrap">
                        <ShareIcon className="w-5 h-5 mr-2" />
                        Share
                    </button>

                    {/* Three Dots */}
                    <div className="relative" ref={moreRef}>
                        <button
                            onClick={() => setShowMoreMenu(!showMoreMenu)}
                            className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                        >
                            <EllipsisVerticalIcon className="w-5 h-5" />
                        </button>

                        {showMoreMenu && (
                            <div className="absolute right-0 mt-2 w-60 bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-2 space-y-1 z-50">
                                <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 rounded-md">
                                    <PencilSquareIcon className="w-5 h-5 mr-3" />
                                    Rename Chat
                                </button>
                                <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 rounded-md">
                                    <LinkIcon className="w-5 h-5 mr-3" />
                                    Copy Link
                                </button>
                                <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-700 rounded-md">
                                    <DocumentDuplicateIcon className="w-5 h-5 mr-3" />
                                    Duplicate Chat
                                </button>
                                <div className="border-t border-gray-700 my-2"></div>
                                <button className="flex items-center w-full px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-md">
                                    <TrashIcon className="w-5 h-5 mr-3" />
                                    Delete Chat
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ================= CHAT BODY ================= */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-[720px] mx-auto w-full p-6 space-y-4">
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
                                className={`max-w-[75%] px-4 py-2 rounded-lg ${
                                    msg.sender === "user"
                                        ? "bg-emerald-600 rounded-br-none"
                                        : "bg-gray-800 rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* ================= INPUT ================= */}
            <div className="border-t border-gray-800 p-4 bg-gray-900 shrink-0">
                <div className="max-w-[720px] mx-auto w-full">
                    <div className="flex items-center">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Message ChatGPT..."
                            rows={1}
                            className="flex-1 resize-none px-4 py-3 rounded-xl bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                            onClick={handleSend}
                            className="ml-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl transition"
                        >
                            Send
                        </button>
                    </div>

                    <div className="flex mt-3 space-x-3 flex-wrap">
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                            <PaperClipIcon className="w-5 h-5" />
                            Attach
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                            <MagnifyingGlassIcon className="w-5 h-5" />
                            Search
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                            <BookOpenIcon className="w-5 h-5" />
                            Study
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                            <PhotoIcon className="w-5 h-5" />
                            Create Image
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4 px-4">
                        ChatGPT can make mistakes. Check important information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatGPTLayout;