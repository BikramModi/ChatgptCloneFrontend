// src/components/SingleProductDescriptionCard.jsx
import React from "react";
import {
  ShoppingCart,
  Zap,
  BadgePercent,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../protectedRoutes/CartContext";

const SingleProductDescriptionCard = ({ item }) => {
  if (!item) return null;

  const {
    _id,
    name,
    description,
    price,
    originalPrice,
    discount,
    stock,
    image,
  } = item;

   const { addToCart } = useCart();
   const navigate = useNavigate();

  const handleAddToCart = async (e) => {
      e.preventDefault(); // stop Link navigation
  
      try {
        const res = await addToCart(_id, 1);
  
        // 🧠 Detect message from backend
        const message =
          res.message ||
          (res.updated
            ? "Quantity increased in cart 🛒"
            : "Added to cart successfully 🛒");
  
        // 🎉 Show toast
        if (message.toLowerCase().includes("quantity")) {
          toast.info("Quantity increased in cart 🛒");
        } else {
          toast.success("Added to cart successfully 🛒");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to add to cart ❌");
      }
    };



    const handleAddToCart1 = async (e) => {
      e.preventDefault(); // stop Link navigation
  
      try {
        const res = await addToCart(_id, 1);
  
        // 🧠 Detect message from backend
        const message =
          res.message ||
          (res.updated
            ? "Quantity increased in cart 🛒"
            : "Added to cart successfully 🛒");
  
        // 🎉 Show toast
        if (message.toLowerCase().includes("quantity")) {
          toast.info("Quantity increased in cart 🛒");
          navigate("/cart");
          
        } else {
          toast.success("Added to cart successfully 🛒");
          navigate("/cart");
          
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to add to cart ❌");
      }
    };

  


  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-pink-50 p-6">

      <div className="bg-indigo-300 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8 max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* 🖼️ Image */}
        <div className="relative flex items-center justify-center bg-white rounded-2xl p-6 shadow-inner">
          {discount > 0 && (
            <span className="absolute top-4 left-4 flex items-center gap-1 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow">
              <BadgePercent size={16} />
              {discount}% OFF
            </span>
          )}

          <img
            src={image}
            alt={name}
            className="max-h-105 object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* 📄 Details */}
        <div className="flex flex-col justify-between">

          <div className="space-y-5">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {name}
            </h1>

            <p className="text-gray-600 leading-relaxed text-base">
              {description}
            </p>

            {/* Price */}
            <div className="flex items-end gap-4">
              <span className="text-4xl font-extrabold text-green-600">
                Rs. {price}
              </span>

              {originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  Rs. {originalPrice}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 text-sm font-semibold">
              <PackageCheck
                size={18}
                className={stock > 0 ? "text-green-600" : "text-red-500"}
              />
              <span
                className={stock > 0 ? "text-green-600" : "text-red-500"}
              >
                {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-600" />
                Secure Payment
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-blue-600" />
                Fast Delivery
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-4">

            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900
              cursor-pointer
              text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              onClick={handleAddToCart1}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r
              cursor-pointer
              from-orange-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <Zap size={20} />
              Buy Now
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleProductDescriptionCard;
