import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand & Description */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">E-Shop</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Your one-stop destination for quality products, amazing deals,
            and fast, reliable delivery.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/category/men">Men</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/category/women">Women</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/category/electronics">Electronics</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/category/accessories">Accessories</Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/careers">Careers</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-white transition cursor-pointer">
              <Mail size={16} />
              <span>help@eshop.com</span>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition cursor-pointer">
              <Phone size={16} />
              <span>+977 9800000000</span>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition cursor-pointer">
              <MapPin size={16} />
              <span>Kathmandu, Nepal</span>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 mt-8">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} E-Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
