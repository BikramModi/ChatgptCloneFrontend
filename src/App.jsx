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
import AboutUsPage from "./pages/simplePages/AboutUsPage"
import BlogPage from "./pages/simplePages/BlogPage"
import ContactPage from "./pages/simplePages/ContactPage"
import CareerPage from "./pages/simplePages/CareerPage"



import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"


import UserDashboardPage from "./pages/UserDashboardPage"
import CartPage from "./pages/CartPage"
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"
import OrderPage from "./pages/OrderPage"
import OrderItemPage from "./pages/OrderItemPage"
import CheckoutPage from "./pages/CheckoutPage"
import ReviewPage from "./pages/ReviewPage"
import SingleProductPage from "./pages/SingleProductPage"
import ReviewCreationPage from "./pages/ReviewCreationPage"
import PayOrderPage from "./pages/PayOrderPage"

import CheckoutPagePay from "./paymentsUI/CheckoutPagePay"
import EsewaCheckoutPage from "./paymentsUI/EsewaCheckoutPage"
import EsewaPaymentSuccess from "./paymentsUI/EsewaPaymentSuccess"
import EsewaPaymentFailed from "./paymentsUI/EsewaPaymentFailed"
import KhaltiPaymentPage from "./paymentsUI/KhaltiPaymentPage";
import KhaltiPaymentSuccess from "./paymentsUI/KhaltiPaymentSuccess";

import SearchPage from "./pages/SearchPage";




import SellerHomePage from "./sellerPages/SellerHomePage"
import SellerCategoryPage from "./sellerPages/SellerCategoryPage";
import CategoryCreationPage from "./sellerPages/CategoryCreationPage";
import ViewProductPage from "./sellerPages/ViewProductPage";
import OrderPages from "./sellerPages/OrderPages";
import OrderItemPages from "./sellerPages/OrderItemPages";
import UpdateStatusPage from "./sellerPages/UpdateStatusPage";

import UpdateCategoryPage from "./sellerPages/UpdateCategoryPage";
import AddProductPage from "./sellerPages/AddProductPage";
import UpdateProductPage from "./sellerPages/UpdateProductPage";
import UsersPage from "./sellerPages/UsersPage";
import AddReviewPage from "./sellerPages/AddReviewPage";


import CategoryWithProductsPage from "./pages/CategoryWithProductsPage";
import CodPaymentPage from "./paymentsUI/CodPaymentPage";
import PrivacyPolicyPage from "./pages/simplePages/PrivacyPolicyPage";


import ChatGPTLayout1 from "./pages/ChatgptNewChat1";
import ChatGPTLayout2 from "./pages/ChatgptNewChat2";



function App() {

  // const ProtectedRoute1 = () => {
  //   const { token, logout } = useAuth();

  //   try {
  //     if (!token) {
  //       logout();
  //       return <Navigate to="/" />;
  //     }

  //     const decodedToken = jwtDecode(token);
  //     console.log("Decoded Token:", decodedToken);

  //     const userId = decodedToken?.userId;
  //     const role = decodedToken?.role;

  //     // 🔴 Token expired
  //     if (decodedToken?.exp) {
  //       const currentTime = Date.now() / 1000;
  //       if (decodedToken.exp < currentTime) {
  //         logout();
  //         return <Navigate to="/login" />;
  //       }
  //     }

  //     // 🔴 Invalid token
  //     if (!userId) {
  //       logout();
  //       return <Navigate to="/login" />;
  //     }

  //     // 🧠 RETURN LAYOUT BASED ON ROLE
  //     if (role === "user") {
  //       return <AppLayout1 />;
  //     }

  //     // 👤 default: normal user
  //     return <Navigate to="/login" />;

  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     logout();
  //     return <Navigate to="/login" />;
  //   }
  // };


  // code for protected route for user role

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
    if (!user || user.role !== "user") return <Navigate to="/login" />;

    // ✅ Authenticated as user, render layout
    return <AppLayout1 />;
  };





  // const ProtectedRoute2 = () => {
  //   const { token, logout } = useAuth();

  //   try {
  //     if (!token) {
  //       logout();
  //       return <Navigate to="/" />;
  //     }

  //     const decodedToken = jwtDecode(token);
  //     console.log("Decoded Token:", decodedToken);

  //     const userId = decodedToken?.userId;
  //     const role = decodedToken?.role;

  //     // 🔴 Token expired
  //     if (decodedToken?.exp) {
  //       const currentTime = Date.now() / 1000;
  //       if (decodedToken.exp < currentTime) {
  //         logout();
  //         return <Navigate to="/login" />;
  //       }
  //     }

  //     // 🔴 Invalid token
  //     if (!userId) {
  //       logout();
  //       return <Navigate to="/login" />;
  //     }

  //     // 🧠 RETURN LAYOUT BASED ON ROLE
  //     if (role === "admin") {
  //       return <AppLayout2 />;
  //     }

  //     // 👤 default: normal user
  //     return <Navigate to="/login" />;

  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     logout();
  //     return <Navigate to="/login" />;
  //   }
  // };




  // code for protected route for admin role

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
    if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

    // ✅ Authenticated admin, render layout
    return <AppLayout2 />;
  };


  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />



          <Route element={<ProtectedRoute1 />}>

            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact1" element={<ContactPage />} />



            <Route path="/user-dashboard" element={<CategoryWithProductsPage />} />
            <Route path="/new-chat" element={ <ChatGPTLayout1 /> } />
            <Route path="/new-chats/:id" element={ <ChatGPTLayout2 /> } />




            <Route path="/category" element={<CategoryPage />} />
            <Route path="/category/:id" element={<ProductPage />} />
            <Route path="/single-product/:catId/:id" element={<SingleProductPage />} />

            <Route path="/cart" element={<CartPage />} />


            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/orders" element={<OrderPage />} />
            <Route path="/order-items/:id" element={<OrderItemPage />} />

            <Route path="/pay-order" element={<PayOrderPage />} />
            <Route path="/pay-stripe/:id/:amount" element={<CheckoutPagePay />} />
            <Route path="/pay-esewa/:id/:amount" element={<EsewaCheckoutPage />} />
            <Route path="/esewa-payment-success" element={<EsewaPaymentSuccess />} />
            <Route path="/esewa-payment-failed" element={<EsewaPaymentFailed />} />

            <Route path="/pay-khalti/:id/:amount" element={<KhaltiPaymentPage />} />
            <Route path="/khalti-payment-success" element={<KhaltiPaymentSuccess />} />

            <Route path="/pay-cod/:id/:amount" element={<CodPaymentPage />} />

            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/create-review" element={<ReviewCreationPage />} />

            <Route path="/search" element={<SearchPage />} />

          </Route>




          <Route element={<ProtectedRoute2 />}>

            <Route path="/admin-dashboard" element={<SellerHomePage />} />
            <Route path="/seller/dashboard" element={<SellerHomePage />} />
            <Route path="/seller/category" element={<SellerCategoryPage />} />
            <Route path="/create-category" element={<CategoryCreationPage />} />
            <Route path="/view-product/:id" element={<ViewProductPage />} />

            <Route path="/update/category/:id" element={<UpdateCategoryPage />} />
            <Route path="/add-new-product/:id" element={<AddProductPage />} />
            <Route path="/update-product/:productId/:id" element={<UpdateProductPage />} />

            <Route path="/order" element={<OrderPages />} />
            <Route path="/order-itemsss/:id" element={<OrderItemPages />} />
            <Route path="/update-status/:id" element={<UpdateStatusPage />} />

            <Route path="/users" element={<UsersPage />} />

            <Route path="/seller-reviews/:id" element={<AddReviewPage />} />



          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
