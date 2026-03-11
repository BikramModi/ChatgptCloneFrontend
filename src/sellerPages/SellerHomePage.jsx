import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const SellerHomePage = ({ sidebarOpen }) => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch flagged messages
  const fetchFlags = async () => {
    try {
      setLoading(true);
      const res = await api.get("/flags");
      setFlags(res.data?.data || []);
      toast.success("Flags loaded successfully ✅");
    } catch (err) {
      console.error("Failed to fetch flags", err);
      toast.error("Failed to load flagged content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  // Update moderation action
  const updateAction = async (flagId, actionTaken) => {
    try {
      await api.patch(`/flags/${flagId}`, { actionTaken });
      setFlags((prev) =>
        prev.map((flag) =>
          flag._id === flagId ? { ...flag, actionTaken } : flag
        )
      );
      toast.success("Moderation action updated ✅");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold">
        Loading flagged messages...
      </div>
    );
  }

  // Determine left margin based on sidebar state
  const getLeftMargin = () => {
    if (windowWidth < 1024) return "ml-0"; // mobile: overlay sidebar
    return sidebarOpen ? "lg:ml-64" : "lg:ml-16"; // desktop/tablet
  };

  return (
    <div
      className={`max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-4 transition-all duration-300 ${getLeftMargin()}`}
    >
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
        Flagged Content Moderation
      </h2>

      {flags.length === 0 ? (
        <p className="text-gray-400 text-center text-sm sm:text-base">
          No flagged messages found.
        </p>
      ) : (
        flags.map((flag) => (
          <div
            key={flag._id}
            className="
              bg-[#2f2f2f] border border-gray-700 rounded-xl p-4
              flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4
              hover:bg-[#343434] transition
            "
          >
            {/* Message Info */}
            <div className="space-y-2 w-full sm:max-w-[70%]">
              <p className="text-xs sm:text-sm md:text-base text-gray-300 wrap-break-word">
                <span className="text-gray-500">Message:</span>{" "}
                {flag?.messageId?.content || "Message unavailable"}
              </p>

              <div className="flex gap-2 flex-wrap">
                {/* Category */}
                <span className="text-[10px] sm:text-xs md:text-sm px-2 py-1 rounded bg-[#404040] text-gray-200">
                  {flag.category}
                </span>

                {/* Severity */}
                <span
                  className={`text-[10px] sm:text-xs md:text-sm px-2 py-1 rounded ${
                    flag.severity === "high"
                      ? "bg-red-600 text-white"
                      : flag.severity === "medium"
                      ? "bg-yellow-500 text-black"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {flag.severity}
                </span>

                {/* Action Taken */}
                <span className="text-[10px] sm:text-xs md:text-sm px-2 py-1 rounded bg-[#404040] text-gray-300">
                  {flag.actionTaken}
                </span>
              </div>

              <p className="text-[9px] sm:text-xs md:text-sm text-gray-500">
                {new Date(flag.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Moderation Action */}
            <div className="w-full sm:w-auto shrink-0">
              <select
                value={flag.actionTaken}
                onChange={(e) => updateAction(flag._id, e.target.value)}
                className="
                  w-full sm:w-auto
                  bg-[#202123] border border-gray-600
                  text-gray-200 text-xs sm:text-sm md:text-base
                  px-3 py-2 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                "
              >
                <option value="none">None</option>
                <option value="masked">Mask</option>
                <option value="blocked">Block</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerHomePage;