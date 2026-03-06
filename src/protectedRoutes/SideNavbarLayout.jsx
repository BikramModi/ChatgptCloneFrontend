import React, { useState, useEffect, useRef } from "react";
import {
    Bars3Icon,
    ChatBubbleLeftRightIcon,
    PlusIcon,
    Cog6ToothIcon,
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    QuestionMarkCircleIcon,
    ChevronRightIcon,
    DocumentTextIcon,
    LifebuoyIcon,
    SparklesIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideNavbarLayout = ({ children }) => {

    const [editingChatId, setEditingChatId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");

    const [collapsed, setCollapsed] = useState(false);
    const [closed, setClosed] = useState(window.innerWidth < 768);

    const [openMenu, setOpenMenu] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);

    const [conversations, setConversations] = useState([]);
    const [openChatMenu, setOpenChatMenu] = useState(null);

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const menuRef = useRef();
    const navigate = useNavigate();

    /* ================= FETCH USER ================= */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/auth/me", {
                    withCredentials: true,
                });
                setUser(res.data.user);
            } catch (err) {
                navigate("/login");
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, [navigate]);

    /* ================= FETCH CONVERSATIONS ================= */
    const fetchConversations = async () => {
        try {
            const res = await api.get("/conversations", {
                withCredentials: true,
            });

            setConversations(res.data.data || []);
        } catch (err) {
            console.error("Conversation fetch error", err);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    /* ================= CLOSE DROPDOWNS ================= */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
                setOpenHelp(false);
            }

            setOpenChatMenu(null);
        };

        window.addEventListener("click", handleClickOutside);

        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    /* ================= RESPONSIVE ================= */
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setClosed(true);
            } else {
                setClosed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* ================= CHAT ACTIONS ================= */

    const renameConversation = async (id) => {
        try {
            await api.patch(`/conversations/${id}`, {
                title: editingTitle,
            });

            setConversations((prev) =>
                prev.map((chat) =>
                    chat._id === id ? { ...chat, title: editingTitle } : chat
                )
            );

            setEditingChatId(null);
            setEditingTitle("");

            toast.success("Chat renamed");
        } catch (err) {
            toast.error("Rename failed");
        }
    };

    const deleteConversation = async (id) => {
        if (!window.confirm("Delete this chat?")) return;

        try {
            await api.delete(`/conversations/${id}`);

            toast.success("Chat deleted");
            fetchConversations();
        } catch {
            toast.error("Delete failed");
        }
    };

    const archiveConversation = async (id) => {
        try {
            await api.patch(`/conversations/${id}/archive`);

            toast.success("Chat archived");
            fetchConversations();
        } catch {
            toast.error("Archive failed");
        }
    };


    const handleOpenChat = (id) => {
        navigate(`/new-chats/${id}`);

        if (window.innerWidth < 768) {
            setClosed(true);
        }
    };



    /* ================= LOGOUT ================= */

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout", {}, { withCredentials: true });

            toast.success("Logged out successfully!");
            setTimeout(() => navigate("/"), 800);
        } catch {
            toast.error("Logout failed");
        }
    };

    const getInitials = () => {
        if (!user?.name) return "U";
        return user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };




    return (
        <div className="flex h-screen bg-gray-950 text-white relative overflow-hidden">

            {/* MOBILE BACKDROP */}
            {!closed && (
                <div
                    onClick={() => setClosed(true)}
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`
        fixed md:relative z-40 md:z-auto
        bg-gray-900 transition-all duration-300 flex flex-col h-full
        ${collapsed ? "w-16" : "w-64"}
        ${closed ? "-translate-x-full" : "translate-x-0"}
        md:translate-x-0
      `}
            >
                {/* HEADER */}
                <div className="p-3 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 hover:bg-gray-800 rounded-md"
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>

                        {!collapsed && <span className="font-semibold text-sm">Chats</span>}
                    </div>
                    

<Link to="/new-chat">  
                    <button className="flex items-center gap-3 w-full p-2 mt-3 hover:bg-gray-800 rounded-md">
                        <PlusIcon className="w-5 h-5" />
                        {!collapsed && <span className="text-sm">New Chat</span>}
                    </button>
 </Link>


                </div>

                {/* CHAT LIST */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">

                    {conversations.map((chat, index) => (

                        <div
                            key={chat._id}
                            onClick={() => handleOpenChat(chat._id)}
                            className="flex items-center justify-between group hover:bg-gray-800 rounded-md px-2 py-2"
                        >
                            <button
                                onClick={() => window.innerWidth < 768 && setClosed(true)}
                                className="flex items-center gap-3 flex-1 text-left"
                            >
                                <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />

                                {!collapsed && (
                                    editingChatId === chat._id ? (
                                        <input
                                            autoFocus
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            onMouseDown={(e) => e.stopPropagation()}
                                            onKeyDown={(e) => {
                                                e.stopPropagation();

                                                // 🚀 Prevent space triggering parent button click
                                                if (e.key === " ") {
                                                    e.preventDefault();
                                                    setEditingTitle((prev) => prev + " ");
                                                    return;
                                                }

                                                if (e.key === "Enter") renameConversation(chat._id);
                                                if (e.key === "Escape") setEditingChatId(null);
                                            }}
                                            onBlur={() => renameConversation(chat._id)}
                                            className="bg-gray-800 text-sm px-2 py-1 rounded w-full outline-none"
                                        />
                                    ) : (
                                        <span className="text-sm truncate">
                                            {chat.title || `Chat ${index + 1}`}
                                        </span>
                                    )
                                )}
                            </button>

                            {!collapsed && (
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenChatMenu(
                                                openChatMenu === chat._id ? null : chat._id
                                            );
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-700"
                                    >
                                        <EllipsisVerticalIcon className="w-5 h-5" />
                                    </button>

                                    {openChatMenu === chat._id && (
                                        <div className="absolute right-0 top-6 w-36 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingChatId(chat._id);
                                                    setEditingTitle(chat.title || "New Chat");
                                                    setOpenChatMenu(null);
                                                }}
                                                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-700"
                                            >
                                                Rename
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenChatMenu(
                                                        openChatMenu === chat._id ? null : chat._id
                                                    );
                                                    archiveConversation(chat._id);


                                                }
                                                }
                                                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-700"
                                            >
                                                Archive
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenChatMenu(
                                                        openChatMenu === chat._id ? null : chat._id
                                                    );
                                                    deleteConversation(chat._id);


                                                }
                                                }
                                                className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                    ))}

                </div>

                {/* FOOTER USER SECTION */}
                <div ref={menuRef} className="relative p-2 border-t border-gray-800">

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(!openMenu);
                        }}
                        className="flex items-center gap-3 w-full p-2 hover:bg-gray-800 rounded-md"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
                            {loadingUser ? "..." : getInitials()}
                        </div>

                        {!collapsed && (
                            <div className="flex flex-col items-start text-left">
                                <span className="text-sm font-medium">
                                    {loadingUser ? "Loading..." : user?.name}
                                </span>
                                <span className="text-xs text-gray-400">Pro Plan</span>
                            </div>
                        )}
                    </button>

                    {openMenu && (
                        <div className="absolute bottom-14 left-2 right-2 bg-gray-800 rounded-xl border border-gray-700 p-2 space-y-1">

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full p-2 hover:bg-red-600/20 text-red-400 rounded-md text-sm"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                Logout
                            </button>

                        </div>
                    )}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col w-full">

                {/* MOBILE TOP BAR */}
                <div className="md:hidden p-4 flex items-center justify-between border-b border-gray-800">
                    <button
                        onClick={() => setClosed(false)}
                        className="p-2 hover:bg-gray-800 rounded-md"
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>

                    <span className="text-sm font-medium">Chats</span>
                </div>

                <div className="flex-1 overflow-auto p-4 md:p-6">
                    {children}
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default SideNavbarLayout;