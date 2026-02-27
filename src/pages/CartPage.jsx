import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItemList from '../components/landingComponents/CartItemList';
import { ChevronLeft } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-indigo-300 min-h-screen p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/user-dashboard')}
        className="flex items-center text-gray-700
               cursor-pointer
               hover:text-blue-600 font-medium mb-6"
      >
        <ChevronLeft size={20} className="mr-2" />
        Back
      </button>
      <div>
        <h2 className="flex justify-center text-2xl font-bold text-gray-800 mb-3">
          My Cart
        </h2>
      </div>
      {/* Cart Items */}
      <CartItemList />
    </div>
  );
};

export default CartPage;
