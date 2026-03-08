import React, { useState, useRef, useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
    PencilSquareIcon,
    CpuChipIcon,
    SparklesIcon,
    ChevronDownIcon,
    ExclamationCircleIcon,
    ClipboardIcon,
    CheckIcon,
    BoltIcon,
    ShareIcon,
    TrashIcon,
    ArrowDownTrayIcon,
    PlusIcon,
    MicrophoneIcon,
    PaperClipIcon,
    PaperAirplaneIcon,
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

    const [versions, setVersions] = useState({});
    const [currentVersionIndex, setCurrentVersionIndex] = useState({});

    const [usageWarning, setUsageWarning] = useState(null);

    const bottomRef = useRef(null);
    const textareaRef = useRef(null);


    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

    const [activeModel, setActiveModel] = useState("gpt-3.5");

    const modelRef = useRef(null);
    const menuRef = useRef(null);





    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                setModelDropdownOpen(false);
            }

            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchedVersionsRef = useRef(new Set());

    /* ----------------------------- AUTO FOCUS ----------------------------- */

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    /* ----------------------------- AUTO SCROLL ----------------------------- */

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* ----------------------------- LAST MESSAGES ----------------------------- */

    const lastUserMessageId = useMemo(() => {
        return [...messages].reverse().find((m) => m.sender === "user")?._id;
    }, [messages]);

    const lastAssistantMessageId = useMemo(() => {
        return [...messages].reverse().find((m) => m.sender === "assistant")?._id;
    }, [messages]);

    /* ----------------------------- FETCH VERSIONS ----------------------------- */

    const fetchVersions = async (messageId) => {
        if (!conversationId) return;

        if (fetchedVersionsRef.current.has(messageId)) return;

        fetchedVersionsRef.current.add(messageId);

        try {
            const res = await fetch(
                `http://localhost:6005/messagesvr/${conversationId}/${messageId}/versions`,
                { credentials: "include" }
            );

            if (!res.ok) return;

            const data = await res.json();

            const versionsData = data.versions || data.data || [];

            if (!versionsData.length) return;

            setVersions((prev) => ({
                ...prev,
                [messageId]: versionsData,
            }));

            setCurrentVersionIndex((prev) => ({
                ...prev,
                [messageId]: versionsData.length - 1,
            }));
        } catch (err) {
            console.error("Version fetch error:", err);
        }
    };

    /* ----------------------------- WATCH MESSAGES ----------------------------- */

    useEffect(() => {
        if (!conversationId) return;

        messages.forEach((msg) => {
            if (
                msg.sender === "assistant" &&
                msg._id &&
                !msg._id.startsWith("temp")
            ) {
                fetchVersions(msg._id);
            }
        });
    }, [messages, conversationId]);

    /* ----------------------------- COPY ----------------------------- */

    const handleCopy = async (text, id) => {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    /* ----------------------------- LOAD MESSAGES ----------------------------- */

    const loadMessages = async (convId) => {
        try {
            const res = await fetch(
                `http://localhost:6005/messages/conversations/${convId}/messages`,
                { credentials: "include" }
            );

            const data = await res.json();

            const formatted = (data.data || data).map((m) => ({
                _id: m._id,
                sender: m.role,
                content: m.content,
            }));

            setMessages(formatted);

            return formatted; // 👈 important

        } catch (err) {
            console.error(err);
            return [];
        }
    };

    useEffect(() => {
        if (conversationId) loadMessages(conversationId);
    }, [conversationId]);

    /* ----------------------------- CREATE CONVERSATION ----------------------------- */

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

    /* ----------------------------- STREAM DELAY ----------------------------- */

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const streamWithDelay = async (text, tempId) => {
        for (let word of text.split(" ")) {
            await sleep(80);

            setMessages((prev) =>
                prev.map((msg) =>
                    msg._id === tempId
                        ? {
                            ...msg,
                            typing: false,
                            content: msg.typing
                                ? word
                                : msg.content + " " + word,
                        }
                        : msg
                )
            );
        }
    };
    /* ----------------------------- SEND MESSAGE ----------------------------- */

    const handleSend = async () => {
        if (!input.trim() || isStreaming) return;

        let convId = conversationId;
        if (!convId) convId = await createConversation();

        const userText = input;

        setInput("");
        setUsageWarning(null);
        setIsStreaming(true);

        const tempUserId = "temp-user-" + Date.now();
        const tempAssistantId = "temp-assistant-" + Date.now();


        setMessages((prev) => [
            ...prev,
            { _id: tempUserId, sender: "user", content: userText },
            {
                _id: tempAssistantId,
                sender: "assistant",
                content: "Assistant is typing...",
                typing: true,
            },
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
                const error = await response.json();
                setUsageWarning(error.message);

                setIsStreaming(false);
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
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
            console.error(err);
            setUsageWarning("Network error. Please try again.");
        }

        setIsStreaming(false);
    };

    /* ----------------------------- REGENERATE ----------------------------- */

    const handleRegenerate = async (messageId) => {
        if (isStreaming) return;

        setIsStreaming(true);

        try {
            const res = await fetch(
                `http://localhost:6005/messages/messages/${messageId}/regenerate`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                console.error("Regenerate failed");
                setIsStreaming(false);
                return;
            }

            // Clear cached versions so they refetch
            fetchedVersionsRef.current.clear();

            // Clear local version states
            setVersions({});
            setCurrentVersionIndex({});

            // Reload messages
            await loadMessages(conversationId);

        } catch (err) {
            console.error(err);
        }

        setIsStreaming(false);
    };



    const handleEdit = (msg) => {
        setEditingId(msg._id);
        setEditingText(msg.content);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingText("");
    };

    const handleSaveEdit = async () => {
        if (!editingText.trim() || isStreaming) return;

        try {
            setEditingId(null);
            setEditingText("");

            const userText = editingText;

            const tempUserId = "temp-user-" + Date.now();
            const tempAssistantId = "temp-assistant-" + Date.now();

            setMessages((prev) => [
                ...prev,
                { _id: tempUserId, sender: "user", content: userText },
                { _id: tempAssistantId, sender: "assistant", content: "" },
            ]);

            setIsStreaming(true);

            const response = await fetch(
                `http://localhost:6005/messages/conversations/${conversationId}/messages`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ content: userText }),
                }
            );

            if (!response.ok) {
                setIsStreaming(false);
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n");

                for (let line of lines) {
                    if (!line.startsWith("data:")) continue;

                    const text = line.replace("data:", "").trim();

                    if (text === "[DONE]") {
                        setIsStreaming(false);
                        await loadMessages(conversationId);
                        return;
                    }

                    await streamWithDelay(text, tempAssistantId);
                }
            }
        } catch (err) {
            console.error(err);
        }

        setIsStreaming(false);
    };

    const handleComingSoon = () => {
        toast.info("Feature coming soon 🚀", {
            position: "bottom-right",
            autoClose: 2000,
            theme: "dark",
        });
    };

    const handleMenuClick = () => {
        handleComingSoon();
        setMenuDropdownOpen(false);
    };

    const handleModelSelect = (model) => {
        setActiveModel(model);
        toast.info("Feature coming soon 🚀", {
            position: "bottom-right",
            autoClose: 2000,
            theme: "dark",
        });

        setModelDropdownOpen(false);
    };

    /* ----------------------------- UI ----------------------------- */

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">

            {/* HEADER */}

            <header className="flex justify-between items-center px-6 py-3 border-b border-gray-800">

                {/* LEFT SIDE - MODEL */}

                <div ref={modelRef} className="relative">
                    <button
                        onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                        className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                        <SparklesIcon className="w-5 h-5 text-emerald-400" />
                        ChatGPT
                        <ChevronDownIcon className="w-4 h-4" />
                    </button>

                    {modelDropdownOpen && (
                        <div className="absolute mt-2 w-72 bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-50">

                            {/* GPT 3.5 */}

                            <button
                                onClick={() => handleModelSelect("gpt-3.5")}
                                className="flex items-start gap-3 w-full text-left px-4 py-3 hover:bg-gray-700"
                            >
                                <SparklesIcon className="w-6 h-6 text-emerald-400 mt-1" />

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium">
                                        ChatGPT
                                        {activeModel === "gpt-3.5" && (
                                            <CheckIcon className="w-4 h-4 text-emerald-400" />
                                        )}
                                    </div>

                                    <p className="text-xs text-gray-400">
                                        Fast responses for everyday tasks
                                    </p>
                                </div>
                            </button>

                            {/* GPT 4 */}

                            <button
                                onClick={() => handleModelSelect("gpt-4")}
                                className="flex items-start gap-3 w-full text-left px-4 py-3 hover:bg-gray-700"
                            >
                                <BoltIcon className="w-6 h-6 text-purple-400 mt-1" />

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-medium">
                                        ChatGPT Plus
                                        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                                            Upgrade
                                        </span>

                                        {activeModel === "gpt-4" && (
                                            <CheckIcon className="w-4 h-4 text-emerald-400" />
                                        )}
                                    </div>

                                    <p className="text-xs text-gray-400">
                                        Smarter reasoning and better answers
                                    </p>
                                </div>
                            </button>

                        </div>
                    )}
                </div>

                {/* RIGHT SIDE */}

                <div className="flex items-center gap-4">

                    {/* MEMORY FULL WITH TOOLTIP */}

                    <div className="relative group flex items-center gap-2 text-yellow-400 text-sm cursor-pointer">

                        <ExclamationCircleIcon className="w-5 h-5" />
                        Memory Full

                        {/* TOOLTIP */}

                        <div className="absolute hidden group-hover:block top-8 right-0 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 text-xs text-gray-300 z-50">

                            <p className="font-semibold text-white mb-1">Memory is full</p>

                            <p className="text-gray-400">
                                ChatGPT's memory is full. You can manage saved memories in settings
                                to free up space.
                            </p>

                            <button
                                onClick={handleComingSoon}
                                className="mt-2 text-emerald-400 hover:underline"
                            >
                                Manage memories
                            </button>

                        </div>

                    </div>

                    {/* SHARE BUTTON */}

                    <button
                        onClick={handleComingSoon}
                        className="flex items-center gap-1 text-gray-300 hover:text-white text-sm"
                    >
                        <ShareIcon className="w-5 h-5" />
                        Share
                    </button>

                    {/* THREE DOT MENU */}

                    <div ref={menuRef} className="relative">

                        <button
                            onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                            className="text-gray-300 hover:text-white text-xl"
                        >
                            ⋯
                        </button>

                        {menuDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">

                                {/* Rename */}

                                <button
                                    onClick={handleMenuClick}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-700"
                                >
                                    <PencilSquareIcon className="w-4 h-4 text-gray-400" />
                                    Rename Chat
                                </button>

                                {/* Delete */}

                                <button
                                    onClick={handleMenuClick}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-700"
                                >
                                    <TrashIcon className="w-4 h-4 text-gray-400" />
                                    Delete Chat
                                </button>

                                {/* Export */}

                                <button
                                    onClick={handleMenuClick}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-700"
                                >
                                    <ArrowDownTrayIcon className="w-4 h-4 text-gray-400" />
                                    Export Chat
                                </button>

                            </div>
                        )}

                    </div>

                </div>
            </header>

            {/* CHAT BODY */}

            <div className="flex-1 overflow-y-auto px-6 py-6">



                {messages.length === 0 ? (

                    /* EMPTY CHAT SCREEN */

                    <div className="text-center space-y-6 max-w-xl">
                        <div className="flex justify-center">
                            <SparklesIcon className="w-12 h-12 text-emerald-400" />
                        </div>

                        <h1 className="text-3xl font-semibold">
                            How can I help you today?
                        </h1>

                        <p className="text-gray-400 text-sm">
                            Ask anything — coding help, explanations, ideas, or debugging.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                            <div className="bg-gray-800 p-3 rounded-lg">
                                Explain React hooks with examples
                            </div>

                            <div className="bg-gray-800 p-3 rounded-lg">
                                Fix my JavaScript error
                            </div>

                            <div className="bg-gray-800 p-3 rounded-lg">
                                Write a Node.js API
                            </div>

                            <div className="bg-gray-800 p-3 rounded-lg">
                                Help me debug my code
                            </div>
                        </div>
                    </div>

                ) : (




                    <div className="max-w-3xl mx-auto space-y-6">

                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`flex group ${msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div className="max-w-[75%] relative">

                                    {/* ================= USER MESSAGE ================= */}

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
                                                            onClick={() => handleSaveEdit(msg._id)}
                                                            className="hover:text-white"
                                                        >
                                                            Save
                                                        </button>

                                                        <button
                                                            onClick={() => handleCancelEdit()}
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

                                            {/* USER ACTION BUTTONS */}
                                            <div className="flex justify-end gap-3 mt-2">

                                                {/* COPY */}
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

                                                {/* EDIT (LATEST USER MESSAGE ONLY) */}
                                                {msg._id === lastUserMessageId && (
                                                    <button
                                                        onClick={() => handleEdit(msg)}
                                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                                                    >
                                                        <PencilSquareIcon className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    ) : (

                                        /* ================= ASSISTANT MESSAGE ================= */

                                        <>
                                            <div className="bg-gray-800 px-4 py-3 rounded-2xl">
                                                {
                                                    msg.typing ? (
                                                        <span className="italic text-gray-400 animate-pulse">
                                                            Assistant is typing...
                                                        </span>
                                                    ) : (
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                            {
                                                                versions[msg._id] && versions[msg._id].length
                                                                    ? versions[msg._id][currentVersionIndex[msg._id] ?? versions[msg._id].length - 1]?.content
                                                                    : msg.content
                                                            }
                                                        </ReactMarkdown>
                                                    )
                                                }
                                            </div>

                                            {/* COPY BUTTON */}
                                            <button
                                                onClick={() =>
                                                    handleCopy(
                                                        versions[msg._id]
                                                            ? versions[msg._id][currentVersionIndex[msg._id]]?.content
                                                            : msg.content,
                                                        msg._id
                                                    )
                                                }
                                                className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition"
                                            >
                                                {copiedId === msg._id ? (
                                                    <CheckIcon className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <ClipboardIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                                                )}
                                            </button>

                                            {/* REGENERATE BUTTON */}
                                            {msg._id === lastAssistantMessageId && (
                                                <div className="flex justify-start mt-2">
                                                    <button
                                                        onClick={() => handleRegenerate(msg._id)}
                                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                                                    >
                                                        <CpuChipIcon className="w-4 h-4" />
                                                        Regenerate
                                                    </button>
                                                </div>
                                            )}

                                            {/* VERSION SWITCHER (YOUR ORIGINAL FEATURE) */}
                                            {versions[msg._id] && versions[msg._id].length > 1 && (
                                                <div className="flex items-center gap-2 text-xs mt-2 text-gray-400">
                                                    <button
                                                        disabled={currentVersionIndex[msg._id] === 0}
                                                        onClick={() =>
                                                            setCurrentVersionIndex((prev) => ({
                                                                ...prev,
                                                                [msg._id]: prev[msg._id] - 1,
                                                            }))
                                                        }
                                                    >
                                                        ◀
                                                    </button>

                                                    <span>
                                                        {currentVersionIndex[msg._id] + 1} /{" "}
                                                        {versions[msg._id].length}
                                                    </span>

                                                    <button
                                                        disabled={
                                                            currentVersionIndex[msg._id] ===
                                                            versions[msg._id].length - 1
                                                        }
                                                        onClick={() =>
                                                            setCurrentVersionIndex((prev) => ({
                                                                ...prev,
                                                                [msg._id]: prev[msg._id] + 1,
                                                            }))
                                                        }
                                                    >
                                                        ▶
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div ref={bottomRef} />

                    </div>
                )}
            </div>

            {/* INPUT */}

            <div className="border-t border-gray-800 p-4">

                {usageWarning && (
                    <div className="max-w-3xl mx-auto mb-3 text-red-400 text-sm">
                        ⚠ {usageWarning}
                    </div>
                )}

                <div className="relative max-w-3xl mx-auto flex gap-3">

                    {/* INPUT WRAPPER */}
                    <div className="relative flex justify-between items-center w-full gap-3">

                        {/* PLUS BUTTON */}
                        <button
                            onClick={() => toast.info("Feature coming soon")}
                            className="absolute left-2 bottom-2 group p-1 rounded-lg hover:bg-gray-700 transition"
                        >
                            <PlusIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />

                            <span className="absolute bottom-9 left-1/2 -translate-x-1/2 
  whitespace-nowrap bg-gray-900 text-xs text-white px-2 py-2 rounded 
  opacity-0 group-hover:opacity-100 transition">
                                Add attachment
                            </span>
                        </button>


                        {/* TEXTAREA */}
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
                            }
                            rows={1}
                            placeholder="Message ChatGPT..."
                            className="w-full pl-10 pr-20 py-3 rounded-xl bg-gray-800 text-white"
                        />


                        {/* RIGHT ICONS */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">

                            {/* ATTACHMENT */}
                            <button
                                onClick={() => toast.info("Feature coming soon")}
                                className="relative group p-2 rounded-lg hover:bg-gray-700 transition"
                            >
                                <PaperClipIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />

                                <span className="absolute bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap 
    bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                    Upload file
                                </span>
                            </button>


                            {/* CONDITIONAL SEND / MIC */}
                            {input.trim() ? (
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className={`relative group p-2 rounded-lg transition
      ${input.trim()
                                            ? "bg-emerald-600 hover:bg-emerald-500"
                                            : "bg-gray-700 cursor-not-allowed"}`}
                                >
                                    <PaperAirplaneIcon className="w-5 h-5 text-white rotate-45" />

                                    <span className="absolute bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap 
      bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                        Send message
                                    </span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => toast.info("Feature coming soon")}
                                    className="relative group p-2 rounded-lg hover:bg-gray-700 transition"
                                >
                                    <MicrophoneIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />

                                    <span className="absolute bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap 
      bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
                                        Voice input
                                    </span>
                                </button>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ChatGPTLayout;