import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateStatusCard from "./UpdateStatusCard";
import api from "../api/axios";

import { toast } from "react-toastify";

const UpdateStatusList = () => {
  const { id } = useParams(); // order id from URL

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}/adminonly`); // for admin/seller to get order details
      setOrder(res.data.order);
    } catch (err) {
      toast.error("Failed to load order");
    
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      await api.patch(`/orders/${id}/adminonly`, { status });

      // Update UI instantly
      setOrder((prev) => ({ ...prev, status }));

      toast.success("Status updated successfully ✅");
    } catch (err) {
      toast.error("Failed to update status");
      
    }
  };

  if (loading) return <div className="h-screen bg-gray-600 py-10 text-2xl font-bold mb-4 flex justify-center">Loading order...</div>;
  if (!order) return <div className="h-screen bg-gray-600 py-10 text-2xl font-bold mb-4 flex justify-center">Order not found</div>;

  return (
    <div className="h-screen bg-gray-600 mx-auto px-6 py-10">
      <UpdateStatusCard order={order} onUpdate={updateStatus} />
    </div>
  );
};

export default UpdateStatusList;
