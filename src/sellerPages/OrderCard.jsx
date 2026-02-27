import { Link } from "react-router-dom";

import { Eye } from "lucide-react";
import { Pencil } from "lucide-react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white border rounded-xl shadow p-5 flex flex-col gap-3">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">
          Order ID: {order._id} <br />
          User Name: {order.user.name} <br />
          User Email: {order.user.email} <br />
          User ID: {order.user._id}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold
            ${order.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : order.status === "delivered"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
        >
          {order.status}
        </span>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>📅 Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>💰 Total: Rs. {order.totalAmount}</p>

      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mt-3">
        <Link
          to={`/order-itemsss/${order._id}`}
          className="flex justify-center items-center w-full sm:w-auto px-4 py-2
               bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Eye size={16} className="mr-2" />
          View Details
        </Link>

        <Link
          to={`/update-status/${order._id}`}
          className="flex justify-center items-center w-full sm:w-auto px-4 py-2
               bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Pencil size={16} className="mr-2" />
          Update Status
        </Link>
      </div>

    </div>
  );
};

export default OrderCard;
