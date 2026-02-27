// import React, { useState } from "react";
// import CustomButton from "../components/common/CustomButton";
// import { motion } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
// import { ArrowLeft } from "lucide-react";
// import { toast } from "react-toastify";

// import useAuth from "../hooks/useAuth";
// import { loginUser } from "../api/auth";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect } from "react";

// import { jwtDecode } from "jwt-decode";

// const LoginPage = () => {


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


//     const [formData, setFormData] = useState({ email: "", password: "" });
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.email || !formData.password) {
//             return toast.error("Please fill all fields");
//         }

//         try {
//             setLoading(true);

//             const data = await loginUser(formData);
//             const { token, user } = data;

//             login(user, token);

//             toast.success("Logged in successfully 🎉");

//             // Redirect based on role
//             if (user.role === "user") {
//                 navigate("/user-dashboard");
//             } else {
//                 navigate("/seller/dashboard");
//             }
//         } catch (err) {
//             console.error(err);
//             toast.error(err.response?.data?.message || "Login failed ❌");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <motion.section
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="min-h-screen flex items-center justify-center 
//       bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 px-4"
//         >
//             <motion.div
//                 initial={{ y: 80, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.7, ease: "easeOut" }}
//                 className="
//           w-full max-w-md
//           bg-white/80 backdrop-blur-xl
//           rounded-2xl shadow-2xl
//           p-8
//         "
//             >


//                 {/* Back to Home */}
//                 <Link
//                     to="/"
//                     className="
//     inline-flex items-center gap-2 mb-4
//     text-sm font-semibold text-indigo-600
//     hover:text-indigo-800 transition
//   "
//                 >
//                     <ArrowLeft size={18} />
//                     Back to Home
//                 </Link>




//                 {/* Header */}
//                 <div className="text-center mb-6">
//                     <h2 className="text-4xl font-extrabold text-gray-800">Welcome Back to E-Shop 🛒
//                     </h2>
//                     <p className="text-gray-600 mt-2">
//                         Sign in to continue shopping and manage your orders <span className="font-bold text-indigo-600">E-Shop</span>
//                     </p>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="space-y-5">

//                     {/* Email */}
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Email</label>
//                         <div className="relative mt-1">
//                             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="you@example.com"
//                                 className="
//                   w-full pl-10 pr-4 py-2.5 rounded-lg border
//                   focus:ring-2 focus:ring-indigo-500 focus:outline-none
//                 "
//                             />
//                         </div>
//                     </div>

//                     {/* Password */}
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Password</label>
//                         <div className="relative mt-1">
//                             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="••••••••"
//                                 className="
//                   w-full pl-10 pr-10 py-2.5 rounded-lg border
//                   focus:ring-2 focus:ring-indigo-500 focus:outline-none
//                 "
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
//                             >
//                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Submit */}
//                     <button
//                         disabled={loading}
//                         className="
//               w-full flex items-center justify-center gap-2
//               bg-linear-to-r from-indigo-600 to-purple-600
//               text-white py-3 rounded-lg font-semibold
//               hover:from-indigo-700 hover:to-purple-700
//               transition disabled:opacity-60
//             "
//                     >
//                         <LogIn size={18} />
//                         {loading ? "Logging in..." : "Login"}
//                     </button>
//                 </form>

//                 {/* Footer */}
//                 <div className="text-center mt-6 space-y-2">
//                     <p className="text-gray-600">
//                         Don’t have an account?{" "}
//                         <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
//                             Register
//                         </Link>
//                     </p>

//                     <Link
//                         to="/forgot-password"
//                         className="text-sm text-indigo-500 hover:underline"
//                     >
//                         Forgot password?
//                     </Link>
//                 </div>
//             </motion.div>
//         </motion.section>
//     );
// };

// export default LoginPage;




// code for http only cookie implementation

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { loginUser } from "../api/auth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (!user) return;

    if (user.role === "user") {
      navigate("/user-dashboard", { replace: true });
    } else if (user.role === "seller") {
      navigate("/seller/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      // 🔥 Backend sets HTTP-only cookie automatically
      const data = await loginUser(formData);

      // We only store user in context
      login(data.user);

      toast.success("Logged in successfully 🎉");

      // Redirect based on role
      if (data.user.role === "user") {
        navigate("/user-dashboard");
      } else if (data.user.role === "seller") {
        navigate("/seller/dashboard");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center 
      bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 px-4"
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl 
        rounded-2xl shadow-2xl p-8"
      >
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-4
          text-sm font-semibold text-indigo-600
          hover:text-indigo-800 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Welcome Back to E-Shop 🛒
          </h2>
          <p className="text-gray-600 mt-2">
            Sign in to continue shopping and manage your orders{" "}
            <span className="font-bold text-indigo-600">E-Shop</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border
                focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border
                focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
            bg-linear-to-r from-indigo-600 to-purple-600
            text-white py-3 rounded-lg font-semibold
            hover:from-indigo-700 hover:to-purple-700
            transition disabled:opacity-60"
          >
            <LogIn size={18} />
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          <Link
            to="/forgot-password"
            className="text-sm text-indigo-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LoginPage;
