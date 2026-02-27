import React from 'react'
import Navbar from '../components/landingComponents/Navbar'

import Header from '../components/landingComponents/NavbarChatgpt'

import FlashSaleList from '../components/landingComponents/FlashSaleList'
import BannerCardList from '../components/landingComponents/BannerCardList'
import ImageCarouselList from '../components/landingComponents/ImageCarouselList'

import Footer from '../components/landingComponents/Footer'
import CategoryPage from './CategoryPage'
import GuestWelcomeList from '../components/landingComponents/GuestWelcomeList'

import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import ChatBody from '../components/landingComponents/ChatBody'

const LandingPage = () => {


  // Redirect to user dashboard if logged in
  
  const { token } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  if (!token) return; // not logged in → stay where you are

  try {
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);

    const role = decodedToken?.role;

    if (role === "user") {
      navigate("/user-dashboard", { replace: true });
    } else if (role === "seller") {
      navigate("/seller/dashboard", { replace: true });
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }
}, [token, navigate]);


  return (
    <div className='bg-indigo-300'>

      


      <Header />
      <ChatBody />
      


    </div>
  )
}

export default LandingPage