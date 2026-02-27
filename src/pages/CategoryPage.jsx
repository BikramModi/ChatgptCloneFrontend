import React from "react";
import { useNavigate } from "react-router-dom";
import CategoriesList from "../components/landingComponents/CategoriesList";
import { ChevronLeft } from "lucide-react";

const CategoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-indigo-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700
          cursor-pointer
          hover:text-blue-600 font-medium mb-6"
        >
          <ChevronLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Page Title */}


        {/* Categories List */}
        <CategoriesList />

      </div>
    </div>
  );
};

export default CategoryPage;
