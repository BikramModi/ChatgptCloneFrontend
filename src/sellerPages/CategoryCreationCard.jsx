import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";

import { Plus } from "lucide-react";

const CategoryCreationCard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    if (!description.trim()) {
      return toast.error("Category description is required");
    }

    try {
      setLoading(true);

      await api.post("/categories", { 
        name, 
        description 
      });

      toast.success("Category created successfully!");
      setName("");
      setDescription("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex justify-center">
        Create New Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter category description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg
           hover:bg-green-700 transition disabled:opacity-50 
           flex justify-center items-center cursor-pointer"
        >
          <Plus size={20} className="inline mr-2" />
          {loading ? "Creating..." : "Create Category"}
        </button>

      </form>
    </div>
  );
};

export default CategoryCreationCard;
