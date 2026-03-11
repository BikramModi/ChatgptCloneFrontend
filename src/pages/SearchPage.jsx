// src/pages/SearchPage.jsx

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import FlashSaleCard from "../components/common/FlashSaleCard";
import { Search, PackageSearch } from "lucide-react";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);

        const catRes = await api.get("/categories");
        const categories = catRes.data.data || catRes.data.categories || [];

        const productRequests = categories.map((cat) =>
          api.get(`/${cat._id}/products`)
        );

        const productResponses = await Promise.all(productRequests);

        const allProducts = productResponses.flatMap(
          (res) => res.data.data || res.data || []
        );

        const filtered = allProducts.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filtered);

        if (filtered.length === 0) {
          toast.info("No products found for your search 🔍");
        } else {
          toast.success(`${filtered.length} products found`);
        }

      } catch (err) {
        console.error("Search failed", err);
        toast.error("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-gray-600">
        <Search className="animate-pulse" size={36} />
        <p className="font-medium">Searching for products...</p>
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-indigo-300"> 
    
    
    
    <button
      onClick={() => navigate('/user-dashboard')}
      className="flex items-center text-gray-700
               cursor-pointer
               hover:text-blue-600 font-medium mb-6"
    >
      <ChevronLeft size={20} className="mr-2" />
      Back
    </button>



      {/* 🔍 Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
          <Search className="text-blue-600" />
          Results for:
          <span className="text-blue-600">"{query}"</span>
        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
          {products.length} items found
        </span>
      </div>

      {/* 📦 Empty State */}
      {products.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center text-gray-500 gap-4">
          <PackageSearch size={64} className="text-gray-300" />
          <p className="text-lg font-semibold">No products found</p>
          <p className="text-sm">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {products.map((product) => (
            <FlashSaleCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
