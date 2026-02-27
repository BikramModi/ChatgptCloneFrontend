const OrderItemCards = ({ item }) => {
  return (
    <div className="flex gap-4 border rounded-xl p-4 bg-white shadow-sm mx-5">

      {/* Image */}
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">
          {item.product.name}
        </h3>

        <p className="text-sm text-gray-500">
          {item.product.description}
        </p>

        <div className="mt-2 text-sm space-y-1">
          <p>💰 Price: Rs. {item.price}</p>
          <p>📦 Quantity: {item.quantity}</p>
          <p className="font-semibold">
            Subtotal: Rs. {item.price * item.quantity}
          </p>
        </div>
      </div>

    </div>
  );
};

export default OrderItemCards;
