import React, { useState, useRef, useEffect } from "react";
import {
    PencilSquareIcon,
    CpuChipIcon,
    SparklesIcon,
    ChevronDownIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatGPTLayout = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    // ================= AUTO FOCUS =================
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    // ================= AUTO SCROLL =================
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ================= LOAD MESSAGES =================
    const loadMessages = async (convId) => {
        try {
            const res = await fetch(
                `http://localhost:6005/messages/conversations/${convId}/messages`,
                { credentials: "include" }
            );

            if (!res.ok) {
                console.error("Failed to load messages");
                return;
            }

            const data = await res.json();

            const formatted = (data.data || data).map((m) => ({
                _id: m._id,
                sender: m.role,
                content: m.content,
            }));

            setMessages(formatted);
        } catch (err) {
            console.error("Load error:", err);
        }
    };

    useEffect(() => {
        if (conversationId) {
            loadMessages(conversationId);
        }
    }, [conversationId]);

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
        if (!convId) convId = await createConversation();

        const userText = input;
        setInput("");
        setIsStreaming(true);

        try {
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

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (let line of lines) {
                    if (!line.startsWith("data:")) continue;

                    const word = line.replace("data:", "").trim();

                    if (word === "[DONE]") {
                        setIsStreaming(false);
                        await loadMessages(convId); // reload with real _id
                        return;
                    }
                }
            }
        } catch (err) {
            console.error("Send error:", err);
        }

        setIsStreaming(false);
    };

    // ================= EDIT MESSAGE =================
    const handleEdit = async (messageId) => {
        if (!editingText.trim()) return;

        try {
            await fetch(`http://localhost:6005/messages/messages/${messageId}`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: editingText }),
            });

            setEditingId(null);
            loadMessages(conversationId);
        } catch (err) {
            console.error("Edit error:", err);
        }
    };

    // ================= REGENERATE =================
    const handleRegenerate = async (messageId) => {
        setIsStreaming(true);

        try {
            const response = await fetch(
                `http://localhost:6005/messages/messages/${messageId}/regenerate`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (let line of lines) {
                    if (!line.startsWith("data:")) continue;

                    const word = line.replace("data:", "").trim();

                    if (word === "[DONE]") {
                        setIsStreaming(false);
                        await loadMessages(conversationId);
                        return;
                    }
                }
            }
        } catch (err) {
            console.error("Regenerate error:", err);
        }

        setIsStreaming(false);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-900 text-white">

            {/* HEADER */}
            <header className="sticky top-0 flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-900">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                    <SparklesIcon className="w-5 h-5 text-emerald-400" />
                    ChatGPT
                    <ChevronDownIcon className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                    <ExclamationCircleIcon className="w-5 h-5" />
                    Memory Full
                </div>
            </header>

            {/* CHAT BODY */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="max-w-3xl mx-auto space-y-6">

                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`flex ${
                                msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div className="max-w-[75%]">

                                {msg.sender === "user" ? (
                                    <>
                                        {editingId === msg._id ? (
                                            <div className="bg-emerald-600 p-3 rounded-2xl">
                                                <textarea
                                                    value={editingText}
                                                    onChange={(e) =>
                                                        setEditingText(e.target.value)
                                                    }
                                                    className="w-full bg-transparent outline-none resize-none"
                                                />
                                                <div className="flex gap-4 mt-2 text-xs">
                                                    <button onClick={() => handleEdit(msg._id)}>
                                                        Save
                                                    </button>
                                                    <button onClick={() => setEditingId(null)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-emerald-600 px-4 py-3 rounded-2xl whitespace-pre-wrap">
                                                {msg.content}
                                            </div>
                                        )}

                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={() => {
                                                    setEditingId(msg._id);
                                                    setEditingText(msg.content);
                                                }}
                                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                                            >
                                                <PencilSquareIcon className="w-4 h-4" />
                                                Edit
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-gray-800 px-4 py-3 rounded-2xl whitespace-pre-wrap">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>

                                        <div className="flex justify-start mt-2">
                                            <button
                                                onClick={() =>
                                                    handleRegenerate(msg._id)
                                                }
                                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                                            >
                                                <CpuChipIcon className="w-4 h-4" />
                                                Regenerate
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    {isStreaming && (
                        <div className="text-gray-400 animate-pulse text-sm">
                            Assistant is typing...
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            {/* INPUT */}
            <div className="border-t border-gray-800 p-4">
                <div className="max-w-3xl mx-auto flex gap-3">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            (e.preventDefault(), handleSend())
                        }
                        placeholder="Message ChatGPT..."
                        rows={1}
                        className="flex-1 resize-none px-4 py-3 rounded-xl bg-gray-800 focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="px-5 py-2 bg-emerald-600 rounded-xl hover:bg-emerald-500 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatGPTLayout;
