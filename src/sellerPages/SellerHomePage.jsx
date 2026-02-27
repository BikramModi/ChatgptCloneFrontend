import { Link } from "react-router-dom";


import { Users, Tags } from "lucide-react";
const SellerHomePage = () => {
    return (
        <>
            <div className="h-screen flex items-center justify-center bg-gray-600 px-6">
                <div className="max-w-4xl w-full mb-40 bg-white rounded-2xl shadow-lg p-10 text-center">

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                        Welcome, Seller 👋
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-lg mb-10">
                        Manage your products, track your orders, and grow your business with ease.
                    </p>

                    {/* Actions */}
                    <div className="grid sm:grid-cols-3 gap-6">

                        <Link
                            to="/users"
                            className="flex justify-center items-center gap-3 bg-green-600 text-white py-5 rounded-xl font-semibold text-lg hover:bg-green-700 transition"
                        >
                             <Users size={18} /> Users
                        </Link>

                        <Link
                            to="/seller/category"
                            className="flex justify-center items-center gap-3 bg-blue-600 text-white py-5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
                        >
                            <Tags size={18} /> My Categories
                        </Link>

                        <Link
                            to="/order"
                            className="bg-purple-600 text-white py-5 rounded-xl font-semibold text-lg hover:bg-purple-700 transition"
                        >
                            🧾 My Orders
                        </Link>

                    </div>

                </div>

                

            </div>

          
        </>
    );
};

export default SellerHomePage;
