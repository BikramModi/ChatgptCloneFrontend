import { useState, useEffect } from "react";
import CartItemCard from "../common/CartItemCard";
import useApi from "../../hooks/useApi";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const CartItemList = () => {
  const { data, loading, error } = useApi(
    "/cartItems/getCartItems",
    {},
    [],
    "cartItems"
  );

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(data)) setCartItems(data);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // ================================
  // Increase Quantity
  // ================================
  const increaseQty = async (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const newQty = item.quantity + 1;

    setCartItems((items) =>
      items.map((i) => (i._id === id ? { ...i, quantity: newQty } : i))
    );

    try {
      await api.patch(`/cartItems/${id}`, { quantity: newQty });
      toast.success(`Quantity increased for ${item.product.name}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  // ================================
  // Decrease Quantity
  // ================================
  const decreaseQty = async (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item || item.quantity <= 1) return;

    const newQty = item.quantity - 1;

    setCartItems((items) =>
      items.map((i) => (i._id === id ? { ...i, quantity: newQty } : i))
    );

    try {
      await api.patch(`/cartItems/${id}`, { quantity: newQty });
      toast.info(`Quantity decreased for ${item.product.name}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  // ================================
  // Remove Item with confirmation
  // ================================
  const removeItem = async (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;

    const confirm = window.confirm(
      `⚠️ Are you sure you want to remove "${item.product.name}" from cart?`
    );
    if (!confirm) return;

    setCartItems((items) => items.filter((i) => i._id !== id));

    try {
      await api.delete(`/cartItems/${id}`);
      toast.success(`${item.product.name} removed from cart`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Your cart is empty 🛒
      </p>
    );
  }

  return (
    <div className="space-y-6 mx-3 py-5">
      {cartItems.map((item) => (
        <CartItemCard
          key={item._id}
          item={item}
          onIncrease={increaseQty}
          onDecrease={decreaseQty}
          onRemove={removeItem}
        />
      ))}

      <div className="mt-6 mb-6 flex flex-col md:flex-row justify-between items-center border-t pt-4 bg-blue-300 p-4 shadow rounded-full">
        <h2 className="text-xl font-semibold text-gray-800">
          Total: Rs. {total}
        </h2>
        <button
          className="mt-3 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-4xl
          hover:scale-105 transition
          hover:cursor-pointer
          hover:bg-blue-700 flex items-center gap-2"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItemList;
