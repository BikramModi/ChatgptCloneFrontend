import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
const CategoryWithProductsCard = ({ _id, name, description, price, stock, image, category }) => {
    const { addToCart } = useCart();

    const handleAddToCart = async (e) => {
        e.preventDefault(); // stop Link navigation

        try {
            await addToCart(_id, 1); // ✅ use context function

        } catch (err) {
            alert(err.response?.data?.message || "Failed to add to cart ❌");
        }
    };

    return (
        <Link
            to={`/single-product/${category}/${_id}`}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
        >
            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="h-full object-contain group-hover:scale-105 transition"
                />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2">{name}</h3>
            <p className="text-gray-600 line-clamp-2">{description}</p>

            <div className="flex justify-between items-center mt-2">
                <span className="text-blue-600 font-bold">Rs. {price}</span>
                <span className="text-gray-500 text-sm">Stock: {stock}</span>
            </div>
            <button
                className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>

        </Link>

    );
};

export default CategoryWithProductsCard;
