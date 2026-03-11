import { useParams } from "react-router-dom";
import FlashSaleCard from "../common/FlashSaleCard";
import useApi from "../../hooks/useApi";

const ProductList = () => {
  const { id } = useParams();
  const { data, loading, error } = useApi(`/${id}/products`, {}, []);

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-center items-center">
        <span className="text-gray-600 text-lg">Loading products...</span>
      </div>
    );

  if (error)
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 text-red-500 text-lg">
        Error: {error.message}
      </div>
    );

  if (!data.length)
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 text-gray-500 text-lg">
        No products found in this category.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          All Products
        </h2>
        <p className="text-gray-600 mt-2 md:mt-0">
          Browse our collection of top-quality items
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.map((product) => (
          <FlashSaleCard
            key={product._id}
            {...product}
            className="hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
