// src/pages/CategoryWithProductsList.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";
import FlashSaleCard from "../common/FlashSaleCard";
import ImageCarouselList from "./ImageCarouselList";
import BannerCardList from "./BannerCardList";

const CategoryWithProductsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEverything = async () => {
      try {
        // 1️⃣ Get all categories
        const catRes = await api.get("/categories");
        const categories = catRes.data.data;

        // 2️⃣ For each category get its products
        const categoriesWithProducts = await Promise.all(
          categories.map(async (cat) => {
            const prodRes = await api.get(`/${cat._id}/products`);
            return {
              ...cat,
              products: prodRes.data.data || [],
            };
          })
        );

        setData(categoriesWithProducts);
      } catch (err) {
        console.error("Failed to load categories/products", err);
      } finally {
        setLoading(false);
      }
    };

    loadEverything();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 text-lg font-medium">
        Loading categories and products...
      </div>
    );

  return (
    <>
      <div>

        <ImageCarouselList />
        <BannerCardList />

      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">
        {data.map((category) => (
          <div key={category._id} className="space-y-6">
            {/* Category Header */}
            <div className="bg-blue-50 rounded-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-blue-800">{category.name}</h2>
                {category.description && (
                  <p className="text-gray-600 mt-1">{category.description}</p>
                )}
              </div>
              <span className="text-sm text-gray-500 mt-2 md:mt-0">
                {category.products.length} {category.products.length === 1 ? "product" : "products"}
              </span>
            </div>

            {/* Products Grid */}
            {category.products.length === 0 ? (
              <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500 font-medium">
                No products available in this category
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {category.products.map((product) => (
                  <FlashSaleCard
                    key={product._id}
                    {...product}
                    className="hover:shadow-xl hover:-translate-y-1 transition-transform duration-200"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

    </>
  );
};

export default CategoryWithProductsList;
