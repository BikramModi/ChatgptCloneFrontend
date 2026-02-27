const UpdateProductCard = ({
  categories,
  form,
  setForm,
  onSubmit,
  loading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("originalPrice", form.originalPrice);
    formData.append("stock", form.stock);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }

    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white px-3 rounded-xl shadow border">
      <h2 className="text-xl font-bold  flex justify-center py-3 ">Update Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            className="border p-2 w-full rounded"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Original Price
          </label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Original Price"
            value={form.originalPrice}
            onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
        </div>

        {/* Fixed Category (Not Editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={
              categories.find((c) => c._id === form.category)?.name || "Loading..."
            }
            disabled
            className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Preview old or new image */}
        {form.preview && (
          <img
            src={form.preview}
            className="h-40 object-cover rounded border flex mx-auto"
          />
        )}


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files[0],
                preview: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded
           hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProductCard;
