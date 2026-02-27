import { useState } from "react";
import { Plus } from "lucide-react";

const AddProductCard = ({ categories, onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("originalPrice", originalPrice);
    formData.append("stock", stock);
    formData.append("category", category);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-400 p-6 rounded-xl shadow border py-4">
      <h2 className="text-xl font-bold mb-4 flex justify-center">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Product Name */}
        <div>
          <label className="block mb-1 font-semibold">Product Name</label>
          <input
            className="border p-2 w-full rounded"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Original Price */}
        <div>
          <label className="block mb-1 font-semibold">Original Price</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Enter original price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-1 font-semibold">Stock</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Enter stock quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            className="border p-2 w-full rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-semibold">Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full rounded bg-white"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded
          cursor-pointer flex justify-center items-center hover:bg-green-700 disabled:opacity-50"
        >
          <Plus size={20} className="inline mr-2" />
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductCard;
