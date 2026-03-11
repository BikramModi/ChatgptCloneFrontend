// src/pages/SingleProductDescriptionCardList.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";

import SingleProductDescriptionCard from "../common/SingleProductDescriptionCard";
import useApi from "../../hooks/useApi";
import ReviewList from "./ReviewList";

const SingleProductDescriptionCardList = () => {
  const { id, catId } = useParams();

  const { data, loading, error } = useApi(`/${catId}/products/${id}`, {}, []);

  if (loading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-lg font-semibold">
        Loading product details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-red-500 font-semibold">
        Failed to load product
      </div>
    );

  return (
    <div className="min-h-screen bg-indigo-300 pb-10">

      {/* 🔙 Top Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link
          to={`/user-dashboard`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition font-medium"
        >
          <ArrowLeft size={18} />
          Back to products
        </Link>
      </div>

      {/* 🛍️ Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <SingleProductDescriptionCard item={data} />
      </div>

      

    </div>
  );
};

export default SingleProductDescriptionCardList;
