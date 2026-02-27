import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderItemCards from "./OrderItemCards";
import api from "../api/axios";

const OrderItemLists = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderItems = async () => {
    try {
      const res = await api.get(`/orders/${id}/adminonly`); // for admin/seller to get order items
      setItems(res.data.items || []);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to load order items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, [id]);

  if (loading) return <div className="h-screen bg-gray-600 text-2xl font-bold mb-4 flex justify-center">
                       Loading order items...</div>;

  if (items.length === 0) {
    return <div className="h-screen bg-gray-600 text-2xl font-bold mb-4 flex justify-center">No items found in this order.</div>;
  }

  return (
    <div className="space-y-4 py-10 bg-gray-600 h-screen">
       <h1 className=" text-2xl font-bold text-gray-800 mb-6 items-center justify-center flex">
        Ordered Items
      </h1>
      {items.map((item) => (
        <OrderItemCards key={item._id} item={item} />
      ))}
    </div>
  );
};

export default OrderItemLists;
