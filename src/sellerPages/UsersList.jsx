import { useEffect, useState } from "react";
import UsersCard from "./UsersCard";
import api from "../api/axios";

import { toast } from "react-toastify";



const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // 🗑 Delete user
  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted successfully ✅");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  // 🔁 Change role
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

  if (loading) return <div className="h-screen text-2xl font-bold mb-4 flex justify-center">
                       Loading users...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">All Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <UsersCard
            key={user._id}
            user={user}
            onDelete={deleteUser}
            onChangeRole={changeRole}
          />
        ))
      )}
    </div>
  );
};

export default UsersList;
