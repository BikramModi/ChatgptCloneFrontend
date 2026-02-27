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
} from "@heroicons/react/24/outline";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideNavbarLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [closed, setClosed] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openHelp, setOpenHelp] = useState(false);

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const menuRef = useRef();
    const navigate = useNavigate();

    /* ================= FETCH USER ================= */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/auth/me", {
                    withCredentials: true, // important if using cookies
                });
                setUser(res.data.user);
            } catch (err) {
                console.error("Auth error:", err);
                navigate("/login"); // redirect if not authenticated
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUser();
    }, [navigate]);

    /* ===== Close dropdown on outside click ===== */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
                setOpenHelp(false);
            }
        };

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setOpenMenu(false);
                setOpenHelp(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("click", handleClickOutside);
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    /* ================= CONFIRM LOGOUT ================= */
    const logoutToastId = useRef(null);

    const confirmLogout = () => {
        // Prevent multiple toasts
        if (toast.isActive(logoutToastId.current)) return;

        logoutToastId.current = toast.info(
            ({ closeToast }) => (
                <div className="text-sm">
                    <p className="mb-3 font-medium">
                        Are you sure you want to logout?
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={async () => {
                                closeToast();
                                logoutToastId.current = null;
                                await handleLogout();
                            }}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white text-xs"
                        >
                            Yes
                        </button>

                        <button
                            onClick={() => {
                                closeToast();
                                logoutToastId.current = null;
                            }}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                draggable: false,
            }
        );
    };

    /* ================= LOGOUT ================= */
    /* ================= LOGOUT API ================= */
    const handleLogout = async () => {
        try {
            await api.post(
                "/auth/logout",
                {},
                { withCredentials: true }
            );

            toast.success("Logged out successfully!");
            setTimeout(() => {
                navigate("/");
            }, 800);
        } catch (err) {
            toast.error("Logout failed. Try again.");
        }
    };

    /* ================= GET INITIALS ================= */
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
        <div className="flex h-screen bg-gray-950 text-white relative">
            {/* ================= SIDEBAR ================= */}
            {!closed && (
                <div
                    className={`bg-gray-900 transition-all duration-300 flex flex-col h-full
          ${collapsed ? "w-16" : "w-64"}`}
                >
                    {/* ===== HEADER ===== */}
                    <div className="p-3 border-b border-gray-800">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setCollapsed(!collapsed)}
                                className="p-2 hover:bg-gray-800 rounded-md transition"
                            >
                                <Bars3Icon className="w-6 h-6" />
                            </button>

                            {!collapsed && (
                                <span className="font-semibold text-sm">Chats</span>
                            )}
                        </div>

                        <button className="flex items-center gap-3 w-full p-2 mt-3 hover:bg-gray-800 rounded-md transition">
                            <PlusIcon className="w-5 h-5" />
                            {!collapsed && <span className="text-sm">New Chat</span>}
                        </button>
                    </div>

                    {/* ===== SCROLLABLE CHAT LIST ===== */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <button
                                key={index}
                                className="flex items-center gap-3 w-full p-2 hover:bg-gray-800 rounded-md transition text-gray-300"
                            >
                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                {!collapsed && (
                                    <span className="text-sm truncate">
                                        Chat {index + 1}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* ===== FOOTER USER SECTION ===== */}
                    <div ref={menuRef} className="relative p-2 border-t border-gray-800">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenu(!openMenu);
                            }}
                            className="flex items-center gap-3 w-full p-2 hover:bg-gray-800 rounded-md transition"
                        >
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
                                {loadingUser ? "..." : getInitials()}
                            </div>

                            {!collapsed && (
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-sm font-medium">
                                        {loadingUser ? "Loading..." : user?.name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Pro Plan
                                    </span>
                                </div>
                            )}
                        </button>

                        {/* ===== DROPDOWN ===== */}
                        {openMenu && (
                            <div className="absolute bottom-14 left-2 right-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-2 space-y-1">

                                {/* User Info */}
                                <div className="flex items-center gap-3 p-2 border-b border-gray-700">
                                    <UserCircleIcon className="w-8 h-8 text-gray-300" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-700 rounded-md transition text-sm">
                                    <Cog6ToothIcon className="w-5 h-5" />
                                    Settings
                                </button>

                                {/* Help */}
                                <div
                                    className="relative"
                                    onMouseEnter={() => setOpenHelp(true)}
                                    onMouseLeave={() => setOpenHelp(false)}
                                >
                                    <button className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded-md transition text-sm">
                                        <div className="flex items-center gap-3">
                                            <QuestionMarkCircleIcon className="w-5 h-5" />
                                            Help
                                        </div>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </button>

                                    {openHelp && (
                                        <div className="absolute right-[-180px] top-0 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-2 space-y-1">
                                            <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-700 rounded-md text-sm">
                                                <LifebuoyIcon className="w-5 h-5" />
                                                Help Center
                                            </button>

                                            <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-700 rounded-md text-sm">
                                                <SparklesIcon className="w-5 h-5" />
                                                Release Notes
                                            </button>

                                            <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-700 rounded-md text-sm">
                                                <DocumentTextIcon className="w-5 h-5" />
                                                Terms & Conditions
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={confirmLogout}
                                    className="flex items-center gap-3 w-full p-2 hover:bg-red-600/20 text-red-400 rounded-md transition text-sm"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ================= MAIN CONTENT ================= */}
            <div className="flex-1 flex flex-col">
                <div className="p-4 flex items-center">
                    {closed && (
                        <button
                            onClick={() => setClosed(false)}
                            className="p-2 hover:bg-gray-800 rounded-md transition"
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-auto p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SideNavbarLayout;