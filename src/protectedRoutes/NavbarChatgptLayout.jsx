import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  Bars3Icon,
  ShareIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  PencilSquareIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const NavbarChatgptLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const moreRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">

        {/* LEFT SECTION */}
        <div className="flex items-center space-x-3">
          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-300 hover:bg-gray-800 rounded-md transition"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-lg font-bold text-white">
            G
          </div>

          <h1 className="text-lg font-semibold text-white hidden sm:block">
            ChatGPT Clone
          </h1>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        {/* ================= RIGHT SECTION ================= */}
<div className="flex items-center space-x-3 relative shrink-0">

  {/* MEMORY FULL BADGE */}
  <div className="flex items-center space-x-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/40 rounded-lg text-yellow-400 text-sm whitespace-nowrap">
    <ExclamationCircleIcon className="w-5 h-5" />
    <span className="font-medium">Memory Full</span>
  </div>

  {/* SHARE BUTTON */}
  <button
    className="flex items-center px-4 py-2 text-sm text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition whitespace-nowrap"
  >
    <ShareIcon className="w-5 h-5 mr-2" />
    Share
  </button>

  {/* THREE DOT MENU */}
  <div className="relative">
    <button
      onClick={() => setShowMoreMenu(!showMoreMenu)}
      className="p-2 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
    >
      <EllipsisVerticalIcon className="w-5 h-5" />
    </button>

    {showMoreMenu && (
      <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-2 space-y-1 z-50">

        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
          <PencilSquareIcon className="w-5 h-5 mr-3 text-gray-400" />
          Rename Chat
        </button>

        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
          <LinkIcon className="w-5 h-5 mr-3 text-gray-400" />
          Copy Link
        </button>

        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
          <DocumentDuplicateIcon className="w-5 h-5 mr-3 text-gray-400" />
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

      {/* ================= SIDEBAR ================= */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          ></div>

          <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-white font-semibold">Chats</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md">
                + New Chat
              </button>

              <div className="text-xs text-gray-500 mt-4">Recent</div>

              <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 rounded-md">
                Chat about React
              </button>

              <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-gray-800 rounded-md">
                MERN Authentication
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavbarChatgptLayout;