import { ShoppingCart, PackageCheck, Tag } from "lucide-react";

const OrderItemCard = ({ item }) => {
  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl shadow-md border
    hover:scale-[1.01]
    hover:shadow-lg transition">
      
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {item.product.name}
        </h3>

        <div className="mt-2 text-sm text-gray-600 flex items-center gap-3">
          <PackageCheck size={16} className="text-green-600" />
          <span>Qty: <span className="font-medium">{item.quantity}</span></span>
        </div>

        {item.product.discount > 0 && (
          <div className="mt-1 flex items-center gap-2 text-xs text-red-500 font-semibold">
            <Tag size={14} /> {item.product.discount}% OFF
          </div>
        )}
      </div>

      {/* Price */}
      <div className="text-right flex flex-col justify-between">
        <p className="text-sm text-gray-500">Price</p>
        <p className="text-lg font-bold text-gray-900">
          Rs. {item.product.price * item.quantity}
        </p>
      </div>
    </div>
  );
};

export default OrderItemCard;
