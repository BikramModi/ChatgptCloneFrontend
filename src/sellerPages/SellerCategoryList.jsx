import { useEffect, useState } from "react";
import SellerCategoryCard from "./SellerCategoryCard";
import api from "../api/axios";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

const SellerCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");
            setCategories(res.data.data || []);
        } catch (err) {
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Delete category
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await api.delete(`/categories/${id}`);
            toast.success("Category deleted");

            // Remove from UI
            setCategories((prev) => prev.filter((c) => c._id !== id));
        } catch (err) {
            toast.error(err.response?.data?.message || "Delete failed");
        }
    };

    if (loading) return <div className="h-screen bg-gray-600 text-2xl font-bold mb-4 flex justify-center">Loading Categories...</div>;

    return (
        <div className=" bg-gray-600">

            <div className="flex justify-center items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                    My Categories
                </h2>
            </div>
            <div className="flex justify-end mb-6">


            </div>


            <div className="flex justify-center mb-6 ">

                <Link
                    to={"/create-category"}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 transition"
                >
                    Create Category
                </Link>

            </div>


            <div className="space-y-4">
                {categories.length === 0 ? (
                    <p className="text-gray-500">No categories found.</p>
                ) : (
                    categories.map((cat) => (
                        <SellerCategoryCard
                            key={cat._id}
                            {...cat}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

        </div>
    );
};

export default SellerCategoryList;
