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
import CustomButton from "../components/common/CustomButton";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { user } = useAuth();
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

      toast.success("Registered successfully 🎉");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // After register → go to login
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center bg-gray-600 px-4"
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join E-Shop and start shopping 🛒
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <CustomButton
            text={loading ? "Registering..." : "Register"}
            type="submit"
            disabled={loading}
          />
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </motion.section>
  );
};

export default RegisterPage;
