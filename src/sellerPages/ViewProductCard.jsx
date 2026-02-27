import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

import { useParams } from "react-router-dom";

const ViewProductCard = ({ product, onDelete }) => {

const { id } = useParams(); // category id

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/${id}/products/${product._id}`);
            toast.success("Product deleted successfully");
            onDelete(product._id);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete product");
        }
    };

    return (
        <>

          

            <div className="bg-white rounded-xl shadow border p-4 flex flex-col">

                {/* Image */}
                <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain"
                    />
                </div>

                {/* Info */}
                <h3 className="mt-3 font-semibold text-gray-800 line-clamp-1">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-2 text-sm">
                    <p>💰 Rs. {product.price}</p>
                    <p>📦 Stock: {product.stock}</p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                    <Link
                        to={`/update-product/${product._id}/${id}`}
                        className="flex items-center bg-blue-600 text-white  px-3 rounded hover:bg-blue-700 transition"
                    >
                        Update
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="flex-1  bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                        Delete
                    </button>

                     <Link
                        to={`/seller-reviews/${product._id}`}
                        className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        View Reviews
                    </Link>
                </div>
            </div>

        </>
    );
};

export default ViewProductCard;
