import React, { useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, PackageCheck, DollarSign, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const EsewaCheckout = () => {
  const { id, amount } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);

      const res = await api.post("/payment/esewa/initiatePayment", {
        orderId: id,
        amount: Number(amount),
      });

      const data = res.data.data;

      // 🔥 Create & submit form dynamically
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields = {
        amount: data.amount,
        tax_amount: 0,
        total_amount: data.amount,
        transaction_uuid: data.transaction_uuid,
        product_code: data.product_code,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: data.signature,
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: data.success_url,
        failure_url: data.failure_url,
      };

      for (let key in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment initiation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto p-6 bg-blue-300 rounded-2xl shadow-lg space-y-6"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-indigo-600 font-semibold
        cursor-pointer
        hover:text-indigo-800 transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Header */}
      <div className="flex items-center gap-3">
        <CreditCard size={28} className="text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
      </div>

      {/* Order Info */}
      <div className="bg-indigo-50 p-4 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <PackageCheck size={18} className="text-green-600" />
          <span>Order ID: <strong>{id}</strong></span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <DollarSign size={18} className="text-indigo-600" />
          <span>Total Amount: Rs. {amount}</span>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePay}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-semibold
          cursor-pointer
          hover:bg-green-600 transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : <CreditCard size={20} />}
        {loading ? "Redirecting..." : "Pay with eSewa"}
      </button>

      <p className="text-sm text-gray-500 text-center">
        You will be redirected to eSewa to complete your payment securely.
      </p>
    </motion.div>
  );
};

export default EsewaCheckout;
