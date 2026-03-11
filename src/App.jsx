import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";
import api from "./api/axios";
import { jwtDecode } from "jwt-decode";
import AppLayout1 from "./protectedRoutes/AppLayout1";
import AppLayout2 from "./protectedRoutes/AppLayout2";


import LandingPage from "./pages/LandingPage"












import SellerHomePage from "./sellerPages/SellerHomePage"

import UsersPage from "./sellerPages/UsersPage";



import CategoryWithProductsPage from "./pages/CategoryWithProductsPage";



import ChatGPTLayout1 from "./pages/ChatgptNewChat1";
import ChatGPTLayout2 from "./pages/ChatgptNewChat2";



function App() {

 
  const ProtectedRoute1 = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          // Make a request to backend /me route
          const res = await api.get("/auth/me", { withCredentials: true });
          setUser(res.data.user); // backend should return { user: {...} }

          console.log("Fetched user for protected route:", res.data.user);

        } catch (err) {
          console.error("Protected route auth failed", err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, []);

    if (loading) return null; // or spinner

    // If no user or wrong role, redirect
    if (!user || user.role !== "user") return <Navigate to="/" />;

    // ✅ Authenticated as user, render layout
    return <AppLayout1 />;
  };






  const ProtectedRoute2 = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await api.get("/auth/me", { withCredentials: true });
          setUser(res.data.user); // backend returns { user: {...} }
        } catch (err) {
          console.error("Admin auth failed", err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, []);

    if (loading) return null; // or spinner

    // Redirect if not logged in or not admin
    if (!user || user.role !== "admin") return <Navigate to="/" replace />;

    // ✅ Authenticated admin, render layout
    return <AppLayout2 />;
  };


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
       





          <Route element={<ProtectedRoute1 />}>

            



            <Route path="/user-dashboard" element={<CategoryWithProductsPage />} />
            <Route path="/new-chat" element={<ChatGPTLayout1 />} />
            <Route path="/new-chats/:id" element={<ChatGPTLayout2 />} />



       


          </Route>




          <Route element={<ProtectedRoute2 />}>

            



            <Route path="/seller/dashboard" element={<SellerHomePage />} />
            <Route path="/users" element={<UsersPage />} />






          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
