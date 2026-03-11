import PayOrderCard from "../common/PayOrderCard";
import useApi from "../../hooks/useApi";

const PayOrderList = () => {
  // 🔹 Call API
  const { data: orders, loading, error } = useApi(
    "/orders/getMyOrders", // ⬅️ change to your real endpoint
    {},
    [],
    "orders"
  );
console.log("My Orders:", orders);
console.log("My First Order:", orders?.[0]);
  
const recentOrder = orders?.[0];
console.log("My Recent Order:", recentOrder);

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
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Orders
      </h2>

      <div className="space-y-4">
        
          <PayOrderCard key={recentOrder._id} order={recentOrder} />
      
      </div>
    </div>
  );
};

export default PayOrderList;
