import { useState } from "react";

const UpdateStatusCard = ({ order, onUpdate }) => {
  const [status, setStatus] = useState(order.status);

  const handleSubmit = () => {
    onUpdate(status);
  };

  return (
    <div className="border rounded-xl p-6 bg-white shadow-md max-w-xl mx-auto">

      <h2 className="text-xl font-bold mb-4 flex justify-center py-4">Update Order Status</h2>

      <div className="space-y-2 text-sm">
        <p><b>Order ID:</b> {order._id}</p>
    
        <p><b>Total:</b> Rs. {order.totalAmount}</p>
        <p>
          <b>Current Status:</b>{" "}
          <span className="font-semibold text-blue-600">
            {order.status}
          </span>
        </p>
      </div>

      <div className="mt-4">
        <label className="block mb-1 font-semibold">New Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 w-full bg-amber-200"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded
         hover:bg-green-700 cursor-pointer transition"
      >
        Update Status
      </button>
    </div>
  );
};

export default UpdateStatusCard;
