import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="bg-gray-300 flex items-center gap-4 p-4 border rounded-lg shadow 
    hover:scale-101
    hover:shadow-lg transition">

      {/* Product Image */}
      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800">{item.product.name}</h3>
        <p className="text-gray-500 mt-1 text-sm">Rs. {item.product.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => onDecrease(item._id)}
            className="p-1 border rounded cursor-pointer hover:bg-gray-100 transition"
          >
            <Minus size={16} />
          </button>

          <span className="px-3 py-1 border rounded text-gray-700 font-medium">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item._id)}
            className="p-1 border rounded cursor-pointer hover:bg-gray-100 transition"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item._id)}
        className="p-2 rounded-full cursor-pointer hover:bg-red-100 transition ml-auto"
      >
        <Trash2 size={20} className="text-red-600 hover:text-red-800" />
      </button>
    </div>
  );
};

export default CartItemCard;
