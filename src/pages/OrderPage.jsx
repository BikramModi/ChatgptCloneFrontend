import React from 'react'
import OrderList from '../components/landingComponents/OrderList'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const OrderPage = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-indigo-300'>

      {/* Back Button */}
      <button
        onClick={() => navigate('/user-dashboard')}
        className="flex items-center text-gray-700
                     cursor-pointer
                     hover:text-blue-600 font-medium py-3 ml-4"
      >
        <ChevronLeft size={20} className="mr-2" />
        Back
      </button>

      <OrderList />
    </div>
  )
}

export default OrderPage