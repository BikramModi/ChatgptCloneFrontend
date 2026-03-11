// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import CustomButton from "../components/common/CustomButton";

// import { registerUser } from "../api/auth";
// import { useNavigate } from "react-router-dom";

// import useAuth from "../hooks/useAuth";
// import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";


// const RegisterPage = () => {



//   // Redirect to user dashboard if logged in
  
//   const { token } = useAuth();
// const navigate1 = useNavigate();

// useEffect(() => {
//   if (!token) return; // not logged in → stay where you are

//   try {
//     const decodedToken = jwtDecode(token);
//     console.log("Decoded Token:", decodedToken);

//     const role = decodedToken?.role;

//     if (role === "user") {
//       navigate1("/user-dashboard", { replace: true });
//     } else if (role === "seller") {
//       navigate1("/seller/dashboard", { replace: true });
//     }
//   } catch (error) {
//     console.error("Invalid token:", error);
//   }
// }, [token, navigate1]);




//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",

//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };


//     const navigate = useNavigate(); // ✅ correct import
//     const handleSubmit = async (e) => {
//         e.preventDefault();



//         try {
//             console.log("LOGIN PAYLOAD:", formData);

//             const data = await registerUser(formData);

//             console.log("REGISTER RESPONSE:", data);
//             console.log("Register Data:", formData);
//             alert("Registered successfully! (mock)");

//             setFormData({
//                 name: "",
//                 email: "",
//                 password: "",

//             });

//             navigate("/login");

//         } catch (err) {
//             console.error("Full error:", err);
//             console.error("Response data:", err.response?.data);
//             console.error("Status:", err.response?.status);
//             alert(err.response?.data?.message || "Login failed");
//         }


//     };

//     const variants = {
//         hidden: { opacity: 0, y: 60 },
//         visible: { opacity: 1, y: 0 },
//         exit: { opacity: 0, y: -30 },
//     };

//     return (
//         <motion.section
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{
//                 duration: 1.2,
//                 ease: "easeInOut",
//             }}
//             className="min-h-screen flex items-center justify-center bg-gray-600 px-4"
//         >

//             <motion.div
//                 key="step1"
//                 variants={variants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 transition={{ duration: 0.6 }}
//                 className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
//             >

//                 {/* Header */}
//                 <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
//                     Create Account
//                 </h2>
//                 <p className="text-center text-gray-600 mb-6">
//                     Join WanderWise and start exploring the universe
//                 </p>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-gray-700 mb-1">Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 mb-1">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 mb-1">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                     </div>



//                     <CustomButton text="Register" type="submit" />
//                 </form>

//                 {/* Footer */}
//                 <p className="text-center text-gray-600 mt-6">
//                     Already have an account?{" "}
//                     <a href="/login" className="text-purple-600 hover:underline">
//                         Login
//                     </a>
//                 </p>
//             </motion.div>
//         </motion.section>
//     );
// };

// export default RegisterPage;




// code for http only cookie implementation

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!user) return;
    navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Account created successfully 🚀");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-gray-950 via-gray-900 to-black
      px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md sm:max-w-lg
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6
          text-xs sm:text-sm font-medium text-gray-400
          hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-500/10 p-3 rounded-full">
              <MessageSquare size={28} className="text-emerald-400" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Create Account
          </h2>

          <p className="text-sm sm:text-base text-gray-400 mt-2">
            Start your AI journey today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <div className="relative mt-2">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3
                bg-gray-900 border border-gray-700
                text-white rounded-lg
                text-sm sm:text-base
                focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="relative mt-2">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3
                bg-gray-900 border border-gray-700
                text-white rounded-lg
                text-sm sm:text-base
                focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <div className="relative mt-2">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3
                bg-gray-900 border border-gray-700
                text-white rounded-lg
                text-sm sm:text-base
                focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
            bg-emerald-500 hover:bg-emerald-600
            text-black font-semibold
            py-3 rounded-lg
            text-sm sm:text-base
            transition disabled:opacity-60"
          >
            <UserPlus size={18} />
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-400 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default RegisterPage;
