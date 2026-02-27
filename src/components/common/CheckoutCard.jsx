import { Package, Hash, IndianRupee } from "lucide-react";

const CheckoutCard = ({ item }) => {
  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex items-center gap-4 bg-blue-300 p-4 rounded-2xl shadow-md border 
    hover:scale-105
    hover:bg-blue-200
    hover:shadow-lg transition">

      {/* Image */}
      <div className="w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 flex items-center gap-2">
          <Package size={16} className="text-indigo-600" />
          {item.product.name}
        </h3>

        <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
          <Hash size={14} className="text-gray-500" />
          Qty: <span className="font-semibold">{item.quantity}</span>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="text-xs text-gray-500">Subtotal</p>
        <p className="text-lg font-bold text-gray-900 flex items-center justify-end gap-1">
          <IndianRupee size={16} className="text-green-600" />
          {subtotal}
        </p>
      </div>

    </div>
  );
};

export default CheckoutCard;
