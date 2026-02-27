// src/components/common/FooterLayout.jsx
import React from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Home, ShoppingCart, Package, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

const AppFooter1 = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">E-Shop</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for all your needs. Find the best products, deals, and offers here.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-white transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white transition"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <Link to="/user-dashboard" className="flex items-center gap-2 hover:text-white transition">
            <Home size={16} /> Dashboard
          </Link>
          <Link to="/category" className="flex items-center gap-2 hover:text-white transition">
            <Package size={16} /> Categories
          </Link>
          <Link to="/cart" className="flex items-center gap-2 hover:text-white transition">
            <ShoppingCart size={16} /> Cart
          </Link>
          <Link to="/orders" className="flex items-center gap-2 hover:text-white transition">
            <Package size={16} /> Orders
          </Link>
        </div>

        {/* Customer Service */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white mb-2">Customer Service</h3>
          <Link to="/faq" className="flex items-center gap-2 hover:text-white transition">
            <LifeBuoy size={16} /> FAQ
          </Link>
          <Link to="/contact1" className="flex items-center gap-2 hover:text-white transition">
            <Mail size={16} /> Contact Us
          </Link>
          <Link to="/returns" className="flex items-center gap-2 hover:text-white transition">
            <Package size={16} /> Returns
          </Link>
          <Link to="/support" className="flex items-center gap-2 hover:text-white transition">
            <LifeBuoy size={16} /> Support
          </Link>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin size={16} /> 123 E-Shop Street, Kathmandu, Nepal
          </p>
          <p className="flex items-center gap-2 text-gray-400 text-sm">
            <Phone size={16} /> +977 980-123-4567
          </p>
          <p className="flex items-center gap-2 text-gray-400 text-sm">
            <Mail size={16} /> support@eshop.com
          </p>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default AppFooter1;
