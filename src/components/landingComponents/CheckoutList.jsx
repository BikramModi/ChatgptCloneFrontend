import CheckoutCard from "../common/CheckoutCard";
import useApi from "../../hooks/useApi";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  Receipt,
  Truck,
  Percent,
  IndianRupee,
  CreditCard,
} from "lucide-react";

import { toast } from "react-toastify";

const CheckoutList = () => {
  const { data: cartItems, loading, error } = useApi(
    "/cartItems/getCartItems",
    {},
    [],
    "cartItems"
  );

  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-600">
        Loading checkout...
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  if (!cartItems || cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20 text-lg">
        Your cart is empty 🛒
      </p>
    );
  }

  // 🔹 Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shipping = 150;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  // ================================
  // 🛒 Handle Checkout
  // ================================
  const handleCheckout = async () => {
    try {
      toast.loading("Placing your order...");

      await api.post("/orders/checkout");

      toast.dismiss();
      toast.success("Order placed successfully 🎉");

      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Failed to place order ❌");
    }
  };

  return (
    <div className=" max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

      {/* Left: Items */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ShoppingBag className="text-indigo-600" />
          Review Your Items
        </h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <CheckoutCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Right: Summary */}
      <div className="bg-blue-300 p-6 rounded-2xl shadow-lg border h-fit sticky top-24">

        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Receipt className="text-green-600" />
          Order Summary
        </h3>

        <div className="space-y-3 text-sm text-gray-700">

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <IndianRupee size={16} />
              Subtotal
            </span>
            <span>Rs. {subtotal}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Truck size={16} />
              Shipping
            </span>
            <span>Rs. {shipping}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <Percent size={16} />
              Tax (5%)
            </span>
            <span>Rs. {tax}</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span className="flex items-center gap-1">
              <IndianRupee size={18} className="text-green-600" />
              {total}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-linear-to-r from-green-600 to-emerald-600 text-white py-3 
          hover:cursor-pointer
          hover:scale-105
          rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <CreditCard />
          Place Order
        </button>
      </div>

    </div>
  );
};

export default CheckoutList;
