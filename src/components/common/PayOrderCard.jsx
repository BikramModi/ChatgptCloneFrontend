import { Link } from "react-router-dom";

import api from "../../api/axios";

const PayOrderCard = ({ order }) => {

  const handleStripe = () => {
    // redirect to backend stripe checkout
    window.location.href = `/pay-stripe/${order._id}/${order.totalAmount}`;


  };

  const handleEsewa = () => {
    window.location.href = `/api/payments/esewa/${order._id}`;
  };

  const handleKhalti = () => {
    window.location.href = `/api/payments/khalti/${order._id}`;
  };

  const handleCOD = async () => {
    try {
      const res = await fetch(`/api/payments/cod/${order._id}`, {
        method: "POST",
      });

      if (res.ok) {
        alert("Order placed with Cash on Delivery");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="block bg-white rounded-xl shadow-md p-5 border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left */}
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-800">{order._id}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Right */}
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            Rs. {order.totalAmount}
          </p>

          <span
            className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${order.status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Payment Buttons */}
      {order.status !== "paid" && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">

          <Link to={`/pay-stripe/${order._id}/${order.totalAmount}`}>
            <div

              className="bg-indigo-600 text-white flex justify-center py-2 rounded-lg hover:bg-indigo-700"
            >
              Pay with Stripe
            </div>
          </Link>

          <Link to={`/pay-esewa/${order._id}/${order.totalAmount}`}>
            <div

              className="bg-indigo-600 text-white flex justify-center py-2 rounded-lg hover:bg-indigo-700"
            >
              eSewa
            </div>
          </Link>

          <Link to={`/pay-khalti/${order._id}/${order.totalAmount}`}>
            <div

              className="bg-indigo-600 text-white flex justify-center py-2 rounded-lg hover:bg-indigo-700"
            >
              Khalti
            </div>
          </Link>

          <Link to={`/pay-cod/${order._id}/${order.totalAmount}`}>
            <div

              className="bg-indigo-600 text-white flex justify-center py-2 rounded-lg hover:bg-indigo-700"
            >
              Cash on Delivery
            </div>
          </Link>
     
        </div>
      )}

      {/* View Order */}
      <Link
        to={`/order-items/${order._id}`}
        className="block mt-4 text-center text-sm text-blue-600 hover:underline"
      >
        View Order Details
      </Link>
    </div>
  );
};

export default PayOrderCard;
