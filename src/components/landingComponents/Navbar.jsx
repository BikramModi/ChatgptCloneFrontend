import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Info, FileText, Phone, Store } from "lucide-react";

import { motion } from "framer-motion";

const GuestNavbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">



    <Link
      to="/"
      className="flex items-center gap-2 text-2xl font-extrabold text-indigo-600 relative"
    >
      {/* Store icon vibrating */}
      <motion.div
        animate={{ x: [0, -2, 2, -2, 2, 0], rotate: [0, -2, 2, -2, 2, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop" }}
      >
        <Store size={28} />
      </motion.div>

      {/* Animated E in E-Shop */}
      <span className="inline-block relative">
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "loop" }}
        >
          E
        </motion.span>
        -Shop
      </span>
    </Link>




        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-xl relative"
        >
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products, brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2.5 rounded-l-xl border
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
          <button
            type="submit"
            className="
              bg-linear-to-r from-indigo-600 to-purple-600
              text-white px-5 rounded-r-xl
              hover:from-indigo-700 hover:to-purple-700
              transition font-semibold
            "
          >
            Search
          </button>
        </form>

        {/* Menu for Guest Users */}
        <div className="flex items-center gap-6">
          <Link
            to="/about"
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition font-medium"
          >
            <Info size={18} />
            About Us
          </Link>

          <Link
            to="/blog"
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition font-medium"
          >
            <FileText size={18} />
            Blog
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition font-medium"
          >
            <Phone size={18} />
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default GuestNavbar;
