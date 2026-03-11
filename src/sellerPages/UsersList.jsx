import { useEffect, useState } from "react";
import UsersCard from "./UsersCard";
import api from "../api/axios";
import { toast } from "react-toastify";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // For Delete Modal
  const [deleteUserId, setDeleteUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      toast.success("Users loaded successfully ✅");
      setUsers(res.data.users || res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user API
  const handleDelete = async () => {
    if (!deleteUserId) return;

    try {
      await api.delete(`/users/${deleteUserId}`);
      toast.success("User deleted successfully ✅");
      setUsers((prev) => prev.filter((u) => u._id !== deleteUserId));
      setDeleteUserId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  // Change role API
  const changeRole = async (id, role) => {
    try {
      await api.patch(`/users/${id}`, { role });
      toast.success("User role updated successfully ✅");
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role } : u))
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Role update failed");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold">
        Loading users...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
        All Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-400 text-sm sm:text-base text-center">
          No users found.
        </p>
      ) : (
        users.map((user) => (
          <UsersCard
            key={user._id}
            user={user}
            onDelete={() => setDeleteUserId(user._id)}
            onChangeRole={changeRole}
          />
        ))
      )}

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#202123] rounded-lg p-5 sm:p-6 w-full max-w-sm shadow-lg border border-gray-700">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">
              Confirm Delete
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-5">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteUserId(null)}
                className="
                  px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base
                  border border-gray-600 rounded-md
                  hover:bg-gray-700 transition
                  text-gray-200
                "
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="
                  px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base
                  bg-red-600 hover:bg-red-500 transition
                  text-white rounded-md
                "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;