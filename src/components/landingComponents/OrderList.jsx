import OrderCard from "../common/OrderCard";
import useApi from "../../hooks/useApi";

const OrderList = () => {
  // 🔹 Call API
  const { data: orders, loading, error } = useApi(
    "/orders/getMyOrders", // ⬅️ change to your real endpoint
    {},
    [],
    "orders"
  );



  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!orders || orders.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        You have no orders yet 📦
      </p>
    );
  }

  return (
    <div className=" mx-10 py-3">
      <h2 className="flex justify-center text-2xl font-bold text-gray-800 mb-6">
        My Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
