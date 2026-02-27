import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { CreditCard, Calendar, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoToOrders = () => {
    navigate("/orders"); // Navigate to Orders page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (!clientSecret) {
      toast.error("Client secret not loaded yet");
      return;
    }

    setLoading(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("✅ Payment successful!");
          setPaymentSuccess(true);
        }
      }
    } catch (err) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#4B5563",
        "::placeholder": { color: "#9CA3AF" },
      },
      invalid: { color: "#EF4444" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-1/2 mx-auto bg-blue-200 rounded-2xl shadow-2xl p-8 space-y-6"
    >
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600
        cursor-pointer
        hover:text-indigo-600 transition mb-4"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Payment Success View */}
      {paymentSuccess ? (
        <div className="text-center space-y-4">
          <CheckCircle size={48} className="mx-auto text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
          <p className="text-gray-600">Thank you for your purchase.</p>
          <button
            onClick={handleGoToOrders}
            className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl 
            cursor-pointer
            font-semibold hover:bg-indigo-700 transition flex items-center gap-2 justify-center"
          >
            Go to My Orders
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <CreditCard size={28} className="text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Stripe Payment</h2>
          </div>

          {/* Card Number */}
          <div className="relative border rounded-xl p-3 flex items-center gap-2">
            <CreditCard className="text-green-900" size={20} />
            <CardNumberElement options={elementOptions} className="flex-1" />
          </div>

          {/* Expiry and CVC */}
          <div className="flex gap-4">
            <div className="relative border rounded-xl p-3 flex items-center gap-2 flex-1">
              <Calendar className="text-green-900" size={20} />
              <CardExpiryElement options={elementOptions} className="flex-1" />
            </div>

            <div className="relative border rounded-xl p-3 flex items-center gap-2 flex-1">
              <Lock className="text-green-900" size={20} />
              <CardCvcElement options={elementOptions} className="flex-1" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!stripe || loading || !clientSecret}
            className="w-full flex items-center justify-center gap-2
            cursor-pointer
            bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}
    </motion.div>
  );
};

export default CheckoutForm;
