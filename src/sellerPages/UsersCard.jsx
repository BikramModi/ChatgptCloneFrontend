const UsersCard = ({ user, onDelete, onChangeRole }) => {
  return (
    <div className="bg-white border rounded-xl p-4 shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <span className="text-xs px-2 py-1 rounded bg-gray-100">
          {user.role}
        </span>
      </div>

      <div className="flex gap-2">
        {/* Change Role */}
        <select
          value={user.role}
          onChange={(e) => onChangeRole(user._id, e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        {/* Delete */}
        <button
          onClick={() => onDelete(user._id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UsersCard;
