import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const SellerHomePage = () => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch flagged messages
  const fetchFlags = async () => {
    try {
      setLoading(true);

      const res = await api.get("/flags");

      // API returns { success:true, data:[...] }
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
      <div className="h-screen flex items-center justify-center text-white text-2xl font-bold">
        Loading flagged messages...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">

      <h2 className="text-2xl font-bold text-white text-center">
        Flagged Content Moderation
      </h2>

      {flags.length === 0 ? (
        <p className="text-gray-400 text-center">
          No flagged messages found.
        </p>
      ) : (
        flags.map((flag) => (
          <div
            key={flag._id}
            className="bg-[#2f2f2f] border border-gray-700 rounded-xl p-4 flex justify-between items-start hover:bg-[#343434] transition"
          >
            {/* Message Info */}
            <div className="space-y-2 max-w-[75%]">

              <p className="text-sm text-gray-300">
                <span className="text-gray-500">Message:</span>{" "}
                {flag?.messageId?.content || "Message unavailable"}
              </p>

              <div className="flex gap-2 flex-wrap">

                {/* Category */}
                <span className="text-xs px-2 py-1 rounded bg-[#404040] text-gray-200">
                  {flag.category}
                </span>

                {/* Severity */}
                <span
                  className={`text-xs px-2 py-1 rounded ${
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
                <span className="text-xs px-2 py-1 rounded bg-[#404040] text-gray-300">
                  {flag.actionTaken}
                </span>

              </div>

              <p className="text-xs text-gray-500">
                {new Date(flag.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Moderation Action */}
            <select
              value={flag.actionTaken}
              onChange={(e) =>
                updateAction(flag._id, e.target.value)
              }
              className="bg-[#202123] border border-gray-600 text-gray-200 text-sm px-3 py-1.5 rounded-md"
            >
              <option value="none">None</option>
              <option value="masked">Mask</option>
              <option value="blocked">Block</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerHomePage;