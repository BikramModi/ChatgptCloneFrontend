import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../protectedRoutes/CartContext";
import { toast } from "react-toastify";

const FlashSaleCard = ({
  category,
  _id,
  image,
  name,
  stock,
  price,
  originalPrice,
  discount,
}) => {
  const { addToCart } = useCart();

  const showDiscount =
    originalPrice &&
    originalPrice > 0 &&
    originalPrice > price &&
    discount > 0;

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

  return (
    <Link to={`/single-product/${category}/${_id}`}>
      <div className="relative bg-gray-500 rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col hover:scale-105 duration-300 cursor-pointer">

        {/* Discount Badge */}
        {showDiscount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        {/* Image */}
        <div className="w-full h-32 md:h-40 flex items-center justify-center mb-3">
          <img src={image} alt={name} className="h-full object-contain" />
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
          {name}
        </h3>

        {/* Stock */}
        <p
          className={`text-xs text-center mt-1 font-semibold ${
            stock > 0 ? "text-green-700" : "text-red-600"
          }`}
        >
          {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
        </p>

        {/* Price */}
        <div className="mt-2 flex items-center justify-center space-x-2">
          <span className="text-lg font-bold text-red-600">Rs. {price}</span>

          {showDiscount && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {originalPrice}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={stock <= 0}
          className={`mt-4 w-full py-2 rounded-lg font-semibold transition
            ${
              stock > 0
                ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Link>
  );
};

export default FlashSaleCard;
