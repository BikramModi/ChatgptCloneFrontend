import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Hash, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const KhaltiPaymentSuccess = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6 text-center">
        
        {/* Success Icon */}
        <CheckCircle size={64} className="mx-auto text-red-500" />

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600">
          Your order has been paid successfully via Khalti.
        </p>

        {/* Order Info */}
        <div className="bg-green-50 p-4 rounded-lg flex items-center justify-center gap-2 text-gray-700 font-medium">
          <Hash size={20} className="text-red-600" />
          <span>
            Order ID: <span className="font-semibold text-gray-900">{orderId}</span>
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center justify-center gap-2 w-full bg-red-600
          cursor-pointer
          text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          <ShoppingCart size={20} />
          Go to My Orders
        </button>
      </div>
    </motion.div>
  );
};

export default KhaltiPaymentSuccess;
