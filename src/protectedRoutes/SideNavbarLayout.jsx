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
    ChartBarIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const SideNavbarLayout = ({ children }) => {

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [activeChatId, setActiveChatId] = useState(null);
    const [isNewChatActive, setIsNewChatActive] = useState(false);

    const [usageMetrics, setUsageMetrics] = useState(null);
    const [loadingUsage, setLoadingUsage] = useState(false);

    const [preferences, setPreferences] = useState({
        defaultModel: "",
        temperature: "",
        tone: "",
        theme: "dark"
    });

    const [loadingPreferences, setLoadingPreferences] = useState(false);

    const [activeTab, setActiveTab] = useState("profile");

    const [openSettings, setOpenSettings] = useState(false);

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



    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);

    const userId = user?._id;

    const fetchProfile = async () => {
        try {
            setLoadingProfile(true);

            const res = await api.get(`/users/${userId}`, {
                withCredentials: true,
            });

            setProfile(res.data);
        } catch (err) {
            toast.error("Failed to load profile");
        } finally {
            setLoadingProfile(false);
        }
    };





    useEffect(() => {
        if (activeTab === "preferences") {
            fetchPreferences();
        }
        if (activeTab === "usage") {
            fetchUsageMetrics();
        }
        if (activeTab === "profile") {
            fetchProfile();
        }
    }, [activeTab]);

    const isDark = preferences.theme === "dark";

    const fetchUsageMetrics = async () => {
        try {
            setLoadingUsage(true);

            const res = await api.get("/metrics/usage", {
                withCredentials: true,
            });

            setUsageMetrics(res.data.data[0]);
            console.log("usage is ", usageMetrics);

        } catch (err) {
            toast.error("Failed to load usage metrics");
        } finally {
            setLoadingUsage(false);
        }
    };

    const fetchPreferences = async () => {
        try {
            setLoadingPreferences(true);

            const res = await api.get("/preferences/get", {
                withCredentials: true
            });

            const data = res.data.data;

            setPreferences(data);

        } catch (err) {
            toast.error("Failed to load preferences");
        } finally {
            setLoadingPreferences(false);
        }
    };

    const handlePreferenceChange = (e) => {
        const { name, value } = e.target;

        setPreferences((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const updatePreferences = async () => {
        try {
            await api.patch(
                "/preferences/update",
                preferences,
                { withCredentials: true }
            );

            toast.success("Preferences updated");

        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleThemeChange = async (theme) => {

        // update UI instantly
        setPreferences((prev) => ({
            ...prev,
            theme
        }));

        try {
            await api.patch(
                "/preferences/update",
                { theme },
                { withCredentials: true }
            );
        } catch (err) {
            toast.error("Theme update failed");
        }
    };


    //for dashboard of usage

    const TOKEN_LIMIT = 3000;

    const tokensUsed = usageMetrics?.totalTokens || 0;

    const tokenPercentage = Math.min(
        (tokensUsed / TOKEN_LIMIT) * 100,
        100
    );

    const isNearLimit = tokensUsed >= TOKEN_LIMIT * 0.8;
    const isLimitReached = tokensUsed >= TOKEN_LIMIT;

    //plan upgrade message

    const handleComingSoon = () => {
        toast.success("🚀 Plan upgrades coming soon!", {
            duration: 3000,
        });
    };

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
        setActiveChatId(id);
        setIsNewChatActive(false);
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
                        <button
                            onClick={() => {
                                setIsNewChatActive(true);
                                setActiveChatId(null);
                            }}
                            className={`flex items-center gap-3 w-full p-2 mt-3 rounded-md
${isNewChatActive ? "bg-gray-700" : "hover:bg-gray-800"}
`}
                        >
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
                            className={`flex items-center justify-between group rounded-md px-2 py-2
${activeChatId === chat._id ? "bg-gray-700" : "hover:bg-gray-800"}
`}
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
                                            {chat.title && chat.title.trim() !== "" && chat.title !== "New Chat"
                                                ? chat.title
                                                : `Chat ${conversations.length - index}`}
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
                                                    setEditingTitle(chat.title || `Chat ${index + 1}`);
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
                                <span className="text-xs text-gray-400">Free</span>
                            </div>
                        )}
                    </button>

                    {openMenu && (
                        <div className="absolute bottom-14 left-2 right-2 bg-gray-800 rounded-xl border border-gray-700 shadow-xl overflow-hidden">

                            {/* USER INFO */}
                            <button
                                onClick={() => {
                                    setOpenSettings(true);
                                    setActiveTab("profile");
                                    setOpenMenu(false);
                                }}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-gray-700"
                            >

                                <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold">
                                    {getInitials()}
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{user?.name}</span>
                                    <span className="text-xs text-gray-400">Free Plan</span>
                                </div>

                            </button>

                            {/* SETTINGS */}
                            <button
                                onClick={() => {
                                    setOpenSettings(true);
                                    setActiveTab("profile");
                                    setOpenMenu(false);
                                }}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-gray-700"
                            >
                                <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
                                Settings
                            </button>

                            {/* USAGE */}

                            <button
                                onClick={() => {
                                    setOpenSettings(true);
                                    setActiveTab("usage");
                                    setOpenMenu(false);
                                }}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-gray-700"
                            >
                                <ChartBarIcon className="w-5 h-5 text-gray-400" />
                                Usage Metrics
                            </button>

                            {/* USER PREFERENCES */}
                            <button
                                onClick={() => {
                                    setOpenSettings(true);
                                    setActiveTab("preferences");
                                    setOpenMenu(false);
                                }}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-gray-700"
                            >
                                <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400" />
                                User Preferences
                            </button>

                            {/* UPGRADE PLAN */}
                            <button
                                onClick={() => {
                                    setOpenSettings(true);
                                    setActiveTab("plan");
                                    setOpenMenu(false);
                                }}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-gray-700"
                            >
                                <SparklesIcon className="w-5 h-5 text-gray-400" />
                                Upgrade Plan
                            </button>

                            {/* DIVIDER */}
                            <div className="border-t border-gray-700 my-1"></div>

                            {/* LOGOUT */}
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-600/20"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                Logout
                            </button>
                            {showLogoutModal && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                                    <div className="bg-gray-900 rounded-xl p-6 w-80 shadow-xl">

                                        <h2 className="text-lg font-semibold mb-2">
                                            Log out
                                        </h2>

                                        <p className="text-sm text-gray-400 mb-6">
                                            Are you sure you want to log out of your account?
                                        </p>

                                        <div className="flex justify-end gap-3">

                                            <button
                                                onClick={() => setShowLogoutModal(false)}
                                                className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={handleLogout}
                                                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg"
                                            >
                                                Log out
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            )}

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
            {openSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    {/* BACKDROP */}
                    <div
                        onClick={() => setOpenSettings(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* MODAL */}
                    <div className="relative bg-gray-900 w-[95%] md:w-[700px] h-[500px] rounded-xl shadow-2xl border border-gray-700 flex">

                        {/* LEFT MENU */}
                        <div className="w-56 border-r border-gray-800 p-4 space-y-2">

                            <div className="text-sm font-semibold mb-4 text-gray-300">
                                Settings
                            </div>

                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`flex items-center gap-3 w-full p-2 text-sm rounded-md ${activeTab === "profile" ? "bg-gray-800" : "hover:bg-gray-800"
                                    }`}
                            >
                                <UserCircleIcon className="w-5 h-5" />
                                Profile
                            </button>

                            <button
                                onClick={() => setActiveTab("plan")}
                                className={`flex items-center gap-3 w-full p-2 text-sm rounded-md ${activeTab === "plan" ? "bg-gray-800" : "hover:bg-gray-800"
                                    }`}
                            >
                                <SparklesIcon className="w-5 h-5" />
                                My Plan
                            </button>

                            <button
                                onClick={() => setActiveTab("usage")}
                                className={`flex items-center gap-3 w-full p-2 text-sm rounded-md ${activeTab === "usage" ? "bg-gray-800" : "hover:bg-gray-800"
                                    }`}
                            >
                                <ChartBarIcon className="w-5 h-5" />
                                Usage
                            </button>

                            <button
                                onClick={() => setActiveTab("preferences")}
                                className={`flex items-center gap-3 w-full p-2 text-sm rounded-md ${activeTab === "data" ? "bg-gray-800" : "hover:bg-gray-800"
                                    }`}
                            >
                                <DocumentTextIcon className="w-5 h-5" />
                                User Preferences
                            </button>

                        </div>
                        {/* RIGHT CONTENT */}
                        <div className="flex-1 p-6 overflow-y-auto">

                            {/* PROFILE */}
                            {activeTab === "profile" && (

                                loadingProfile ? (

                                    <div className="flex items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                                    </div>

                                ) : (

                                    <div className="space-y-6">

                                        <h2 className="text-lg font-semibold">Profile</h2>

                                        <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-6 rounded-xl`}>

                                            {/* HEADER */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <p className="text-xl font-semibold">{profile?.name}</p>
                                                    <p className="text-sm text-gray-400">{profile?.email}</p>
                                                </div>

                                                <span className={`text-xs px-3 py-1 rounded-full
${profile?.status === "active"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-red-500/20 text-red-400"}
`}>
                                                    {profile?.status}
                                                </span>
                                            </div>


                                            {/* INFO GRID */}
                                            <div className="grid md:grid-cols-2 gap-4 text-sm">

                                                <div className={`${isDark ? "bg-gray-700" : "bg-gray-100"} p-4 rounded-lg`}>
                                                    <p className="text-gray-400 text-xs">Role</p>
                                                    <p className="mt-1 font-medium capitalize">{profile?.role}</p>
                                                </div>

                                                <div className={`${isDark ? "bg-gray-700" : "bg-gray-100"} p-4 rounded-lg`}>
                                                    <p className="text-gray-400 text-xs">Email Verified</p>
                                                    <p className="mt-1 font-medium">
                                                        {profile?.emailVerified ? "Yes ✅" : "No ❌"}
                                                    </p>
                                                </div>

                                                <div className={`${isDark ? "bg-gray-700" : "bg-gray-100"} p-4 rounded-lg`}>
                                                    <p className="text-gray-400 text-xs">Member Since</p>
                                                    <p className="mt-1 font-medium">
                                                        {profile?.createdAt
                                                            ? new Date(profile.createdAt).toLocaleDateString()
                                                            : "-"}
                                                    </p>
                                                </div>

                                                <div className={`${isDark ? "bg-gray-700" : "bg-gray-100"} p-4 rounded-lg`}>
                                                    <p className="text-gray-400 text-xs">Last Login</p>
                                                    <p className="mt-1 font-medium">
                                                        {profile?.lastLoginAt
                                                            ? new Date(profile.lastLoginAt).toLocaleString()
                                                            : "-"}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                            {/* PLAN */}
                            {activeTab === "plan" && (
                                <>
                                    <div className="space-y-6">

                                        <h2 className="text-lg font-semibold">Your Plan</h2>

                                        <div className="grid md:grid-cols-3 gap-4">

                                            {/* FREE PLAN */}
                                            <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-5 rounded-xl border border-gray-600`}>
                                                <p className="text-sm font-semibold">Free</p>

                                                <p className="text-3xl font-bold mt-2">$0</p>
                                                <p className="text-xs text-gray-400">per month</p>

                                                <ul className="mt-4 space-y-2 text-xs text-gray-400">
                                                    <li>• 3000 tokens / month</li>
                                                    <li>• Basic AI responses</li>
                                                    <li>• Community support</li>
                                                </ul>

                                                <button
                                                    className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg text-sm cursor-not-allowed"
                                                >
                                                    Current Plan
                                                </button>
                                            </div>


                                            {/* GO PLAN */}
                                            <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-5 rounded-xl border border-indigo-500`}>
                                                <p className="text-sm font-semibold">Go</p>

                                                <p className="text-3xl font-bold mt-2">$9</p>
                                                <p className="text-xs text-gray-400">per month</p>

                                                <ul className="mt-4 space-y-2 text-xs text-gray-400">
                                                    <li>• 20,000 tokens / month</li>
                                                    <li>• Faster responses</li>
                                                    <li>• Priority access</li>
                                                </ul>

                                                <button
                                                    onClick={handleComingSoon}
                                                    className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm"
                                                >
                                                    Upgrade
                                                </button>
                                            </div>


                                            {/* PRO PLAN */}
                                            <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-5 rounded-xl border border-purple-500 relative`}>

                                                <span className="absolute top-3 right-3 text-xs bg-purple-600 px-2 py-1 rounded">
                                                    Popular
                                                </span>

                                                <p className="text-sm font-semibold">Pro</p>

                                                <p className="text-3xl font-bold mt-2">$29</p>
                                                <p className="text-xs text-gray-400">per month</p>

                                                <ul className="mt-4 space-y-2 text-xs text-gray-400">
                                                    <li>• 100,000 tokens / month</li>
                                                    <li>• Fastest AI model</li>
                                                    <li>• Priority queue</li>
                                                    <li>• Premium support</li>
                                                </ul>

                                                <button
                                                    onClick={handleComingSoon}
                                                    className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm"
                                                >
                                                    Upgrade to Pro
                                                </button>
                                            </div>

                                        </div>

                                    </div>

                                </>
                            )}

                            {/* USAGE */}
                            {activeTab === "usage" && (

                                loadingUsage ? (

                                    <div className="flex items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                                    </div>

                                ) : (

                                    <div className="space-y-6">

                                        <h2 className="text-lg font-semibold">Usage Metrics</h2>

                                        {/* BILLING PERIOD */}
                                        <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-4 rounded-lg`}>
                                            <p className="text-sm font-medium">Billing Period</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {usageMetrics?.periodStart
                                                    ? new Date(usageMetrics.periodStart).toLocaleDateString()
                                                    : "-"}
                                                {" "} → {" "}
                                                {usageMetrics?.periodEnd
                                                    ? new Date(usageMetrics.periodEnd).toLocaleDateString()
                                                    : "-"}
                                            </p>
                                        </div>

                                        {isNearLimit && !isLimitReached && (
                                            <div className="bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 p-3 rounded-lg text-sm">
                                                ⚠️ You have used <strong>{tokensUsed}</strong> of your <strong>{TOKEN_LIMIT}</strong> monthly tokens.
                                                Consider upgrading your plan to avoid interruptions.
                                            </div>
                                        )}

                                        {isLimitReached && (
                                            <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-3 rounded-lg text-sm">
                                                🚨 You have reached your monthly token limit ({TOKEN_LIMIT}).
                                                Upgrade your plan to continue generating AI responses.
                                            </div>
                                        )}

                                        {/* DASHBOARD GRID */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                            {/* TOTAL MESSAGES */}
                                            <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-4 rounded-lg`}>
                                                <p className="text-sm font-medium">Total Messages</p>
                                                <p className="text-2xl font-semibold mt-2">
                                                    {usageMetrics?.totalMessages || 0}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Messages sent this period
                                                </p>
                                            </div>

                                            {/* TOTAL TOKENS */}
                                            <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-4 rounded-lg`}>
                                                <p className="text-sm font-medium">Total Tokens</p>
                                                <p className="text-2xl font-semibold mt-2">
                                                    {usageMetrics?.totalTokens || 0}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Tokens consumed by AI responses
                                                </p>
                                            </div>

                                            {/* TOTAL COST */}
                                            <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-4 rounded-lg`}>
                                                <p className="text-sm font-medium">Estimated Cost</p>
                                                <p className="text-2xl font-semibold mt-2">
                                                    $
                                                    {usageMetrics?.totalCost?.$numberDecimal
                                                        ? Number(usageMetrics.totalCost.$numberDecimal).toFixed(4)
                                                        : "0.00"}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Current billing period
                                                </p>
                                            </div>

                                        </div>


                                        {/* progress bar */}
                                        <div className={`${isDark ? "bg-gray-800" : "bg-gray-200"} p-4 rounded-lg`}>
                                            <p className="text-sm font-medium">Token Usage</p>

                                            <p className="text-2xl font-semibold mt-2">
                                                {tokensUsed} / {TOKEN_LIMIT}
                                            </p>

                                            <div className="w-full bg-gray-700 h-2 rounded mt-3 overflow-hidden">

                                                <div
                                                    className={`h-2 rounded transition-all ${isLimitReached
                                                        ? "bg-red-500"
                                                        : isNearLimit
                                                            ? "bg-yellow-500"
                                                            : "bg-indigo-500"
                                                        }`}
                                                    style={{ width: `${tokenPercentage}%` }}
                                                />

                                            </div>

                                            <p className="text-xs text-gray-400 mt-2">
                                                {tokenPercentage.toFixed(1)}% of monthly token quota used
                                            </p>
                                        </div>

                                    </div>




                                )
                            )}

                            {/* PREFERENCES */}
                            {activeTab === "preferences" &&

                                (loadingPreferences ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                                    </div>
                                ) :

                                    (

                                        <div className="space-y-6">

                                            <h2
                                                className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"
                                                    }`}
                                            >
                                                User Preferences
                                            </h2>

                                            <div className="space-y-4">

                                                {/* MODEL */}
                                                <div>
                                                    <label
                                                        className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"
                                                            }`}
                                                    >
                                                        Default Model
                                                    </label>

                                                    <select
                                                        name="defaultModel"
                                                        value={preferences.defaultModel}
                                                        onChange={handlePreferenceChange}
                                                        className={`mt-1 w-full p-2 rounded-md text-sm ${isDark
                                                            ? "bg-gray-800 text-white"
                                                            : "bg-gray-200 text-black"
                                                            }`}
                                                    >
                                                        <option value="gpt-3.5">GPT-3.5</option>
                                                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                                        <option value="gpt-4">GPT-4</option>
                                                    </select>
                                                </div>

                                                {/* TEMPERATURE */}
                                                <div>
                                                    <label
                                                        className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"
                                                            }`}
                                                    >
                                                        Temperature
                                                    </label>

                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        max="1"
                                                        name="temperature"
                                                        value={preferences.temperature}
                                                        onChange={handlePreferenceChange}
                                                        className={`mt-1 w-full p-2 rounded-md text-sm ${isDark
                                                            ? "bg-gray-800 text-white"
                                                            : "bg-gray-200 text-black"
                                                            }`}
                                                    />
                                                </div>

                                                {/* TONE */}
                                                <div>
                                                    <label
                                                        className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"
                                                            }`}
                                                    >
                                                        Tone
                                                    </label>

                                                    <select
                                                        name="tone"
                                                        value={preferences.tone}
                                                        onChange={handlePreferenceChange}
                                                        className={`mt-1 w-full p-2 rounded-md text-sm ${isDark
                                                            ? "bg-gray-800 text-white"
                                                            : "bg-gray-200 text-black"
                                                            }`}
                                                    >
                                                        <option value="formal">Formal</option>
                                                        <option value="casual">Casual</option>
                                                    </select>
                                                </div>

                                                {/* THEME */}
                                                <div>
                                                    <label
                                                        className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"
                                                            }`}
                                                    >
                                                        Theme
                                                    </label>

                                                    <select
                                                        name="theme"
                                                        value={preferences.theme}
                                                        onChange={(e) => handleThemeChange(e.target.value)}
                                                        className={`mt-1 w-full p-2 rounded-md text-sm ${isDark
                                                            ? "bg-gray-800 text-white"
                                                            : "bg-gray-200 text-black"
                                                            }`}
                                                    >
                                                        <option value="light">Light</option>
                                                        <option value="dark">Dark</option>
                                                    </select>
                                                </div>

                                                {/* SAVE BUTTON */}
                                                <button
                                                    onClick={updatePreferences}
                                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
                                                >
                                                    Save Preferences
                                                </button>

                                            </div>

                                        </div>

                                    )
                                )}

                        </div>

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setOpenSettings(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default SideNavbarLayout;