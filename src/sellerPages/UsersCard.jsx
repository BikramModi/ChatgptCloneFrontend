const UsersCard = ({ user, onDelete, onChangeRole }) => {
  return (
    <div className="flex items-center justify-between bg-[#2f2f2f] border border-gray-700 rounded-xl p-4 hover:bg-[#343434] transition">

      {/* User Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-medium">{user.name}</h3>

        <p className="text-sm text-gray-400">{user.email}</p>

        <span className="text-xs px-2 py-1 rounded-md bg-[#404040] text-gray-300 w-fit">
          {user.role}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">

        {/* Role Select */}
        <select
          value={user.role}
          onChange={(e) => onChangeRole(user._id, e.target.value)}
          className="bg-[#202123] border border-gray-600 text-gray-200 text-sm px-3 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="user">User</option>
          
          <option value="admin">Admin</option>
        </select>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(user._id)}
          className="text-sm px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default UsersCard;