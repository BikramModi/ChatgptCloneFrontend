import { useEffect, useState } from "react";
import AddProductCard from "./AddProductCard";
import api from "../api/axios";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductList = () => {
  const { id } = useParams(); // category id
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // 🔥 for initial fetch

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setPageLoading(true);
      const res = await api.get("/categories");
      setCategories(res.data.categories || res.data.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
      toast.error("Failed to load categories");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add product
  const addProduct = async (formData) => {
    try {
      setLoading(true);
      await api.post(`${id}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully ✅");
      navigate(-1);
    } catch (err) {
      console.error("Add product failed", err);
      toast.error(err.response?.data?.message || "Add product failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Full page loader while categories are loading
  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-lg font-semibold">
        Loading categories...
      </div>
    );
  }

  return (
    <div className=" py-10">
    <AddProductCard
      categories={categories}
      onSubmit={addProduct}
      loading={loading}
    />
    </div>
  );
};

export default AddProductList;
