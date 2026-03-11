import React, { useState, useEffect } from "react";

const MEMORY_KEY = "memory_banner_closed";
const REMINDER_DURATION = 12 * 60 * 60 * 1000; // 12 hours

const MemoryFullBanner = ({ onManageClick, onUpgradeClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const closedData = localStorage.getItem(MEMORY_KEY);

    if (closedData) {
      const { timestamp } = JSON.parse(closedData);
      const now = Date.now();

      if (now - timestamp < REMINDER_DURATION) {
        return;
      }
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, 8000); // show after 8 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    localStorage.setItem(
      MEMORY_KEY,
      JSON.stringify({ timestamp: Date.now() })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-fade-in">
      <div className="flex justify-between items-center bg-neutral-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-neutral-700">

        <div className="flex flex-col text-sm">
          <span className="font-semibold">Memory full</span>
          <span className="text-neutral-400">
            Responses may feel less personalized. Upgrade to expand memory,
            or manage existing memories.
          </span>
        </div>

        <div className="flex items-center space-x-3 ml-6">
          <button
            onClick={onManageClick}
            className="px-4 py-1.5 text-sm border border-neutral-600 rounded-lg hover:bg-neutral-800 transition"
          >
            Manage
          </button>

          <button
            onClick={onUpgradeClick}
            className="px-4 py-1.5 text-sm bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition"
          >
            Get more
          </button>
        </div>

        <button
          onClick={handleClose}
          className="ml-4 text-neutral-400 hover:text-white text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MemoryFullBanner;