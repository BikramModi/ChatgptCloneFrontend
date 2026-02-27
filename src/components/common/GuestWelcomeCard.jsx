import { Link } from "react-router-dom";
import { LogIn, UserPlus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const GuestWelcomeCard = () => {
  return (
    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">

      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-4 rounded-2xl">
          <ShoppingBag className="animate-bounce" size={36} />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            Welcome to E-Shop
            {/* Animated Hand */}
            <motion.span
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 0,
                ease: "easeInOut",
              }}
              className="inline-block origin-bottom"
            >
              👋
            </motion.span>
          </h2>

          <p className="text-white/90 mt-1">
            Login or create an account to start shopping, track orders and get the best deals!
          </p>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="
            flex items-center gap-2
            bg-white text-indigo-700 px-6 py-3 rounded-xl
            font-semibold shadow hover:scale-105 transition
          "
        >
          <LogIn size={18} />
          Login
        </Link>

        <Link
          to="/register"
          className="
            flex items-center gap-2
            bg-black/20 border border-white/30 text-white
            px-6 py-3 rounded-xl font-semibold
            hover:bg-black/30 transition
          "
        >
          <UserPlus size={18} />
          Register
        </Link>
      </div>
    </div>
  );
};

export default GuestWelcomeCard;
