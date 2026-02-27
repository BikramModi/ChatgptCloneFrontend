import { useEffect, useState } from "react";
import ViewProductCard from "./ViewProductCard";
import api from "../api/axios";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ViewProductList = () => {

    const { id } = useParams(); // category id

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await api.get(`/${id}/products`); // seller products
            setProducts(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const removeFromUI = (id) => {
        setProducts((prev) => prev.filter((p) => p._id !== id));
    };

    if (loading) return <div className=" bg-gray-600 text-2xl font-bold mb-4 flex justify-center py-10">Loading products...</div>;

    return (

        <div className=" bg-gray-600 max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex justify-center">
                My Products
            </h1>

            <Link
                to={`/add-new-product/${id}`}
                className="flex mb-10 bg-blue-600 text-white py-6 items-center justify-center rounded
                 hover:bg-blue-700 transition"
            >
                Add New Product
            </Link>

            {products.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ViewProductCard
                            key={product._id}
                            product={product}
                            onDelete={removeFromUI}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewProductList;
