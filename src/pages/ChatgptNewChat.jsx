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





// const ChatGPTLayout = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [conversationId, setConversationId] = useState(null);
//     const [isStreaming, setIsStreaming] = useState(false);

//     const bottomRef = useRef(null);
//     const textareaRef = useRef(null);

//     useEffect(() => {
//         textareaRef.current?.focus();
//     }, []);

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     const createConversation = async () => {
//         const res = await fetch("http://localhost:6003/conversations", {
//             method: "POST",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 title: "New Chat",
//                 model: "gpt-3.5-turbo",
//                 systemPrompt: "You are a helpful assistant.",
//                 visibility: "private",
//                 isArchived: false,
//             }),
//         });

//         const data = await res.json();
//         setConversationId(data._id);
//         return data._id;
//     };

//     const handleSend = async () => {
//         if (!input.trim() || isStreaming) return;

//         let convId = conversationId;

//         if (!convId) {
//             convId = await createConversation();
//         }

//         const userText = input;
//         setInput("");

//         // 1️⃣ Instantly show user message
//         setMessages((prev) => [
//             ...prev,
//             { sender: "user", content: userText },
//         ]);

//         // 2️⃣ Add empty assistant placeholder
//         setMessages((prev) => [
//             ...prev,
//             { sender: "assistant", content: "" },
//         ]);

//         setIsStreaming(true);

//         // 3️⃣ Call SSE message endpoint
//         const response = await fetch(
//             `http://localhost:6003/messages/conversations/${convId}/messages`,
//             {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ content: userText }),
//             }
//         );

//         const reader = response.body.getReader();
//         const decoder = new TextDecoder("utf-8");

//         let assistantText = "";

//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) break;

//             const chunk = decoder.decode(value, { stream: true });

//             const lines = chunk.split("\n");

//             for (let line of lines) {
//                 if (line.startsWith("data: ")) {
//                     const data = line.replace("data: ", "").trim();

//                     if (data === "[DONE]") {
//                         setIsStreaming(false);
//                         return;
//                     }

//                     assistantText += data;

//                     // Update last assistant message
//                     setMessages((prev) => {
//                         const updated = [...prev];
//                         updated[updated.length - 1].content = assistantText;
//                         return updated;
//                     });
//                 }
//             }
//         }

//         setIsStreaming(false);
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && !e.shiftKey) {
//             e.preventDefault();
//             handleSend();
//         }
//     };

//     return (
//         <div className="flex flex-col h-screen bg-gray-900 text-white">

//             {/* CHAT BODY */}
//             <div className="flex-1 overflow-y-auto">
//                 <div className="max-w-[720px] mx-auto w-full p-6 space-y-4">
//                     {messages.map((msg, idx) => (
//                         <div
//                             key={idx}
//                             className={`flex ${msg.sender === "user"
//                                     ? "justify-end"
//                                     : "justify-start"
//                                 }`}
//                         >
//                             <div
//                                 className={`max-w-[75%] px-4 py-2 rounded-lg ${msg.sender === "user"
//                                         ? "bg-emerald-600 rounded-br-none"
//                                         : "bg-gray-800 rounded-bl-none"
//                                     }`}
//                             >
//                                 {msg.content}
//                             </div>
//                         </div>
//                     ))}

//                     {isStreaming && (
//                         <div className="text-gray-400 text-sm">
//                             Assistant is typing...
//                         </div>
//                     )}

//                     <div ref={bottomRef} />
//                 </div>
//             </div>

//             {/* INPUT */}
//             <div className="border-t border-gray-800 p-4">
//                 <div className="max-w-[720px] mx-auto w-full flex">
//                     <textarea
//                         ref={textareaRef}
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={handleKeyPress}
//                         placeholder="Message ChatGPT..."
//                         rows={1}
//                         className="flex-1 resize-none px-4 py-3 rounded-xl bg-gray-800 focus:outline-none"
//                     />
//                     <button
//                         onClick={handleSend}
//                         className="ml-3 px-4 py-2 bg-emerald-600 rounded-xl"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ChatGPTLayout;





const ChatGPTLayout = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    const modelRef = useRef(null);   // ✅ add this
    const moreRef = useRef(null);    // ✅ add this


    // ✅ ADD THESE (missing before)
    const [showModelMenu, setShowModelMenu] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const createConversation = async () => {
        const res = await fetch("http://localhost:6005/conversations", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "New Chat",
                model: "gpt-3.5-turbo",
                systemPrompt: "You are a helpful assistant.",
                visibility: "private",
                isArchived: false,
            }),
        });

        const data = await res.json();

        console.log("Conversation response:", data); // 🔍 check what the backend sends

        // Use the correct path to _id
        const convId = data?.data?._id || data?._id;

        setConversationId(convId);
        return convId;
    };

    const handleSend = async () => {
        if (!input.trim() || isStreaming) return;

        let convId = conversationId;

        if (!convId) {
            convId = await createConversation();
        }

        const userText = input;
        setInput("");

        // 1️⃣ Instantly show user message
        setMessages((prev) => [
            ...prev,
            { sender: "user", content: userText },
        ]);

        // 2️⃣ Add empty assistant placeholder
        setMessages((prev) => [
            ...prev,
            { sender: "assistant", content: "" },
        ]);

        setIsStreaming(true);

        // 3️⃣ Call SSE message endpoint
        const response = await fetch(
            `http://localhost:6005/messages/conversations/${convId}/messages`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
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
                if (line.startsWith("data: ")) {
                    const data = line.replace("data: ", "").trim();

                    if (data === "[DONE]") {
                        setIsStreaming(false);
                        return;
                    }

                    assistantText += data;

                    // Update last assistant message
                    setMessages((prev) => {
                        const updated = [...prev];
                        updated[updated.length - 1].content = assistantText;
                        return updated;
                    });
                }
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

            {/* CHAT BODY */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-[720px] mx-auto w-full p-6 space-y-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-2 rounded-lg ${msg.sender === "user"
                                    ? "bg-emerald-600 rounded-br-none"
                                    : "bg-gray-800 rounded-bl-none"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isStreaming && (
                        <div className="text-gray-400 text-sm">
                            Assistant is typing...
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            {/* ================= INPUT ================= */}
            <div className="border-t border-gray-800 p-4">
                <div className="max-w-[720px] mx-auto w-full flex">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Message ChatGPT..."
                        rows={1}
                        className="flex-1 resize-none px-4 py-3 rounded-xl bg-gray-800 focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="ml-3 px-4 py-2 bg-emerald-600 rounded-xl"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatGPTLayout;