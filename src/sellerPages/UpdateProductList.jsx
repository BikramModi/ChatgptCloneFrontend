import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateProductCard from "./UpdateProductCard";
import api from "../api/axios";

import { toast } from "react-toastify";

const UpdateProductList = () => {
  const { id } = useParams(); // category id
  const { productId } = useParams(); // product id
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
    preview: "",
  });

  // Load categories + product
  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get("/categories"),
          api.get(`${id}/products/${productId}`),
        ]);

        const product = prodRes.data.product || prodRes.data.data;

        setCategories(catRes.data.categories || catRes.data.data || []);

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          originalPrice: product.originalPrice || "",
          stock: product.stock || "",
          category: product.category?._id || product.category || "",
          image: null,
          preview: product.image || "",
        });

        setPageLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      }
    };

    loadData();
  }, [id]);

  // Update product
  const updateProduct = async (formData) => {
    try {
      setLoading(true);

      await api.patch(`/${id}/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated successfully ✅");
      navigate(-1);
    } catch (err) {
      console.error("Update failed", err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className=" text-2xl font-bold flex justify-center">Loading product...</div>;
  }

  return (
    <div className="py-6">
    
        <UpdateProductCard
          categories={categories}
          form={form}
          setForm={setForm}
          onSubmit={updateProduct}
          loading={loading}
        />
      
    </div>
  );
};

export default UpdateProductList;
