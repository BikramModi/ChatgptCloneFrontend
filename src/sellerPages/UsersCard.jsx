import { User, Shield, Trash2 } from "lucide-react";

const UsersCard = ({ user, onDelete, onChangeRole }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 bg-[#2f2f2f] border border-gray-700 rounded-xl p-4 hover:bg-[#343434] transition">

      {/* User Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-400" />
          <h3 className="text-white text-sm sm:text-base md:text-lg font-medium">
            {user.name}
          </h3>
        </div>

        <p className="text-gray-400 text-xs sm:text-sm md:text-base wrap-break-word">
          {user.email}
        </p>

        <span className="text-[10px] sm:text-xs md:text-sm px-2 py-1 rounded-md bg-[#404040] text-gray-300 w-fit flex items-center gap-1">
          <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
          {user.role}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2 sm:mt-0 w-full sm:w-auto">

        {/* Role Select */}
        <select
          value={user.role}
          onChange={(e) => onChangeRole(user._id, e.target.value)}
          className="
            w-full sm:w-auto
            bg-[#202123] border border-gray-600
            text-gray-200 text-xs sm:text-sm md:text-base
            px-3 py-1.5 rounded-md
            focus:outline-none focus:ring-1 focus:ring-gray-500
            transition
          "
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="
            flex items-center justify-center gap-1
            text-xs sm:text-sm md:text-base
            px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700
            text-white transition w-full sm:w-auto
          "
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

      </div>
    </div>
  );
};

export default UsersCard;