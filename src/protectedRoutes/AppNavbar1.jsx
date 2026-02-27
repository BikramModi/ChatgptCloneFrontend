import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, LayoutGrid, Package, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartContext";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const AppNavbar1 = () => {
  const { logout } = useAuth();
  const { cartCount, hideBadge, setHideBadge } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  const handleCartClick = () => {
    setHideBadge(true);
    navigate("/cart");
  };

  // ✅ Professional logout flow
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    logout();                 // 🔥 your auth logout
    toast.success("Logged out successfully 👋");
    navigate("/login");       // optional redirect
  };

  return (
    <nav className="bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/user-dashboard" className="text-2xl font-bold tracking-wide">
          🛒 E-Shop
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-blue-200 w-full rounded-l-lg px-4 py-2 text-black focus:outline-none"
          />
          <button className="bg-black/20 px-4 rounded-r-lg hover:bg-black/30 transition hover:cursor-pointer">
            <Search size={20} />
          </button>
        </form>

        {/* Menu */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <button
            onClick={handleCartClick}
            className="relative flex items-center gap-1 hover:text-yellow-300 transition hover:cursor-pointer"
          >
            <ShoppingCart size={22} />
            {!hideBadge && cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <Link to="/category" className="flex items-center gap-1 hover:text-yellow-300">
            <LayoutGrid size={18} /> Category
          </Link>

          <Link to="/orders" className="flex items-center gap-1 hover:text-yellow-300">
            <Package size={18} /> Orders
          </Link>

          {/* 🔥 Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold
              hover:scale-105 hover:cursor-pointer hover:bg-gray-100 transition"
          >
            <LogOutIcon size={18} /> Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default AppNavbar1;
