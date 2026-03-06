import React, { useState, useRef, useEffect, useMemo } from "react";
import {
    PencilSquareIcon,
    CpuChipIcon,
    SparklesIcon,
    ChevronDownIcon,
    ExclamationCircleIcon,
    ClipboardIcon,
    CheckIcon
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
    const [copiedId, setCopiedId] = useState(null);

    const bottomRef = useRef(null);
    const textareaRef = useRef(null);


    const [versions, setVersions] = useState({});
    const [currentVersionIndex, setCurrentVersionIndex] = useState({});

    const [usageWarning, setUsageWarning] = useState(null);



    useEffect(() => {
        console.log("Messages changed:", messages);
        console.log("ConversationId:", conversationId);

        if (!conversationId) return;

        messages.forEach((msg) => {
            console.log("Checking message:", msg);

            if (msg.sender === "assistant") {
                console.log("Calling fetchVersions for:", msg._id);
                fetchVersions(msg._id);
            }
        });
    }, [messages, conversationId]);


    const fetchVersions = async (messageId) => {
        if (!conversationId) return;



        try {
            const res = await fetch(
                `http://localhost:6005/messagesvr/${conversationId}/${messageId}/versions`,
                { credentials: "include" }
            );

            if (!res.ok) return;

            const data = await res.json();

            console.log("data is the:", data.versions);

            if (!data.versions || data.versions.length === 0) return;

            setVersions((prev) => ({
                ...prev,
                [messageId]: data.versions,
            }));

            setCurrentVersionIndex((prev) => ({
                ...prev,
                [messageId]: data.versions.length - 1
            }));
        } catch (err) {
            console.error("Version fetch error:", err);
        }
    };




    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const lastUserMessageId = useMemo(() => {
        return [...messages].reverse().find((m) => m.sender === "user")?._id;
    }, [messages]);

    const lastAssistantMessageId = useMemo(() => {
        return [...messages].reverse().find((m) => m.sender === "assistant")?._id;
    }, [messages]);

    const handleCopy = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const loadMessages = async (convId) => {
        try {
            const res = await fetch(
                `http://localhost:6005/messages/conversations/${convId}/messages`,
                { credentials: "include" }
            );

            if (!res.ok) return;

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
        if (conversationId) loadMessages(conversationId);
    }, [conversationId]);

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

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const streamWithDelay = async (text, tempAssistantId) => {
        for (let word of text.split(" ")) {
            await sleep(90);

            setMessages((prev) =>
                prev.map((msg) => {
                    if (msg._id !== tempAssistantId) return msg;

                    let assistantText = msg.content || "";

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

                    return { ...msg, content: formattedText };
                })
            );
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isStreaming) return;

        let convId = conversationId;
        if (!convId) convId = await createConversation();

        const userText = input;
        setInput("");
        setIsStreaming(true);

        const tempUserId = "temp-user-" + Date.now();
        const tempAssistantId = "temp-assistant-" + Date.now();

        setMessages((prev) => [
            ...prev,
            { _id: tempUserId, sender: "user", content: userText },
            { _id: tempAssistantId, sender: "assistant", content: "" },
        ]);

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



            if (!response.ok) {
                const errorData = await response.json();

                setUsageWarning(errorData.message);

                setMessages((prev) =>
                    prev.map((msg) =>
                        msg._id === tempAssistantId
                            ? {
                                ...msg,
                                sender: "assistant",
                                content: `⚠ ${errorData.message || "Something went wrong"}`
                            }
                            : msg
                    )
                );

                setIsStreaming(false);
                return;
            }



            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (let line of lines) {
                    if (!line.startsWith("data:")) continue;

                    const text = line.replace("data:", "").trim();

                    if (text === "[DONE]") {
                        setIsStreaming(false);
                        await loadMessages(convId);
                        return;
                    }

                    await streamWithDelay(text, tempAssistantId);
                }
            }
        } catch (err) {
            console.error("Send error:", err);

            setUsageWarning("⚠ Network error. Please try again.");
        }

        setIsStreaming(false);
    };

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

            await loadMessages(conversationId);

            const latestAssistant = [...messages]
                .reverse()
                .find((m) => m.sender === "assistant");

            if (latestAssistant) {
                await handleRegenerate(latestAssistant._id);
            }
        } catch (err) {
            console.error("Edit error:", err);
        }
    };

    const handleRegenerate = async (messageId) => {
        if (messageId !== lastAssistantMessageId) return;

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
                const { done } = await reader.read();
                if (done) break;
            }

            await loadMessages(conversationId);
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
                            className={`flex group ${msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >
                            <div className="max-w-[75%] relative">

                                {msg.sender === "user" ? (
                                    <>
                                        {editingId === msg._id ? (
                                            <div className="bg-emerald-600 p-3 rounded-2xl">
                                                <textarea
                                                    value={editingText}
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                    className="w-full bg-transparent outline-none resize-none"
                                                />

                                                <div className="flex gap-4 mt-2 text-xs">
                                                    <button
                                                        onClick={() => handleEdit(msg._id)}
                                                        className="hover:text-white"
                                                    >
                                                        Save
                                                    </button>

                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="hover:text-white"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-emerald-600 px-4 py-3 rounded-2xl whitespace-pre-wrap">
                                                {msg.content}
                                            </div>
                                        )}

                                        {/* USER ACTIONS */}
                                        <div className="flex justify-end gap-3 mt-2">

                                            {/* COPY BUTTON */}
                                            <button
                                                onClick={() => handleCopy(msg.content, msg._id)}
                                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                                            >
                                                {copiedId === msg._id ? (
                                                    <>
                                                        <CheckIcon className="w-4 h-4" />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <ClipboardIcon className="w-4 h-4" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>

                                            {/* EDIT BUTTON (LATEST USER MESSAGE ONLY) */}
                                            {msg._id === lastUserMessageId && (
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
                                            )}

                                        </div>
                                    </>
                                ) : (

                                    <>
                                        <div
                                            className={`px-4 py-3 rounded-2xl ${msg.content?.startsWith("⚠")
                                                    ? "bg-red-500/20 border border-red-500 text-red-300"
                                                    : "bg-gray-800"
                                                }`}
                                        >
                                            <div className="prose prose-invert max-w-none">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {
                                                        versions[msg._id]
                                                            ? versions[msg._id][currentVersionIndex[msg._id]]?.content || msg.content
                                                            : msg.content
                                                    }
                                                </ReactMarkdown>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleCopy(msg.content, msg._id)}
                                            className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            {copiedId === msg._id ? (
                                                <CheckIcon className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <ClipboardIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                                            )}
                                        </button>

                                        {versions[msg._id] && versions[msg._id].length > 1 && (
                                            <div className="flex items-center gap-4 mt-2">

                                                {/* REGENERATE ONLY FOR LAST MESSAGE */}
                                                {msg._id === lastAssistantMessageId && (
                                                    <button
                                                        onClick={() => handleRegenerate(msg._id)}
                                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                                                    >
                                                        <CpuChipIcon className="w-4 h-4" />
                                                        Regenerate
                                                    </button>
                                                )}

                                                {/* VERSION SWITCHER */}
                                                <div className="flex items-center gap-2 text-xs text-gray-400">

                                                    <button
                                                        disabled={currentVersionIndex[msg._id] === 0}
                                                        onClick={() =>
                                                            setCurrentVersionIndex((prev) => ({
                                                                ...prev,
                                                                [msg._id]: prev[msg._id] - 1
                                                            }))
                                                        }
                                                        className="hover:text-white disabled:opacity-30"
                                                    >
                                                        ◀
                                                    </button>

                                                    <span>
                                                        {currentVersionIndex[msg._id] + 1} / {versions[msg._id].length}
                                                    </span>

                                                    <button
                                                        disabled={
                                                            currentVersionIndex[msg._id] ===
                                                            versions[msg._id].length - 1
                                                        }
                                                        onClick={() =>
                                                            setCurrentVersionIndex((prev) => ({
                                                                ...prev,
                                                                [msg._id]: prev[msg._id] + 1
                                                            }))
                                                        }
                                                        className="hover:text-white disabled:opacity-30"
                                                    >
                                                        ▶
                                                    </button>

                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    <div ref={bottomRef} />

                </div>
            </div>

            {/* INPUT */}
            <div className="border-t border-gray-800 p-4">

                {usageWarning && typeof usageWarning === "string" && (
                    <div className="max-w-3xl mx-auto mb-3">
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm">
                            ⚠ {usageWarning}
                        </div>
                    </div>
                )}

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