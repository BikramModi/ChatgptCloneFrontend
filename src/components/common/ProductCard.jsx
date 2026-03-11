import { Link } from "react-router-dom";
import api from "../../api/axios";

const ProductCard = ({ _id, name, description, price, stock, image, category }) => {


    const handleAddToCart = async (e) => {
        e.preventDefault(); // ⛔ stop navigation

        try {
            const res = await api.post("/cartItems", {
                product: _id,
                quantity: 1,
            });

            console.log("Added to cart:", res.data);
            alert("Added to cart successfully ✅");

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to add to cart ❌");
        }
    };


    return (
        <Link
            to={`/single-product/${category}/${_id}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
        >


            {/* Title */}
            <h3 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2">
                {name}
            </h3>
            <h3 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2">
                {description}
            </h3>
            <h3 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2">
                {price}
            </h3>
            <h3 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2">
                {stock}
            </h3>
            {/* Image */}
            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="h-full object-contain group-hover:scale-105 transition"
                />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2">
                {category}
            </h3>





            {/* Button */}
            <button
                className="mt-auto bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleAddToCart} 
            >
                Add to Cart
            </button>
        </Link>
    );
};

export default ProductCard;
