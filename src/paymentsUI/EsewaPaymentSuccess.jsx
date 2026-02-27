import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, PackageCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EsewaPaymentSuccess = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-indigo-300 px-4"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
        
        {/* Success Icon */}
        <CheckCircle size={64} className="mx-auto text-green-500" />

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>

        {/* Order Info */}
        <div className="flex items-center justify-center gap-2 text-gray-700 font-medium bg-green-50 p-3 rounded-lg">
          <PackageCheck size={20} className="text-green-600" />
          <span>Your order ID:</span>
          <span className="font-semibold text-gray-900">{orderId}</span>
        </div>

        {/* Message */}
        <p className="text-gray-600">
          Thank you for your purchase! Your payment has been processed successfully.
        </p>

        {/* Go to Orders Button */}
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500
          cursor-pointer
          text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          <ArrowRight size={18} />
          Go to My Orders
        </button>
      </div>
    </motion.div>
  );
};

export default EsewaPaymentSuccess;
