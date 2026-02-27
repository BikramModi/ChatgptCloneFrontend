import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import api from "../api/axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/adminonly"); // for admin/seller to get all orders
      setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className=" text-2xl font-bold mb-4 flex justify-center py-10">
                       Loading orders...</div>;
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className=" text-2xl font-bold text-gray-800 mb-6 items-center justify-center flex">
        Total Orders: {orders.length}
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
