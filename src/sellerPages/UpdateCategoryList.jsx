import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateCategoryCard from "./UpdateCategoryCard";
import api from "../api/axios";

import { toast } from "react-toastify";

const UpdateCategoryList = () => {
  const { id } = useParams(); // category id from URL

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single category
  const fetchCategory = async () => {
    try {
      const res = await api.get(`/categories/${id}`);
      setCategory(res.data.data);
    } catch (err) {
      console.error("Failed to fetch category", err);
      toast.error("Failed to load category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // Update category
  const updateCategory = async (payload) => {
    try {
      await api.patch(`/categories/${id}`, payload);
      toast.success("Category updated successfully ✅");

      // Update UI instantly
      setCategory((prev) => ({ ...prev, ...payload }));
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update category");
    }
  };

  if (loading) return <div className="h-screen bg-gray-600 text-2xl font-bold mb-4 flex justify-center py-6">Loading category...</div>;
  if (!category) return <div className="h-screen bg-gray-600 text-2xl font-bold mb-4 flex justify-center py-6">Category not found</div>;

  return (

    <div className=" h-screen bg-gray-600 mx-auto px-6 py-10">
      <UpdateCategoryCard category={category} onUpdate={updateCategory} />
    </div>


  );
};

export default UpdateCategoryList;
