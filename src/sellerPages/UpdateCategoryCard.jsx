import { useState } from "react";

const UpdateCategoryCard = ({ category, onUpdate }) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, description });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-4 flex justify-center">Update Category</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="py-2">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="border rounded px-3 py-2 w-full"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded
           hover:bg-blue-700 cursor-pointer transition"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryCard;
