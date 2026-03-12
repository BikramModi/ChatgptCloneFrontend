import React from 'react'


import Header from '../components/landingComponents/NavbarChatgpt'


import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import ChatBody from '../components/landingComponents/ChatBody'

const LandingPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);
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
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      <Header />
      <div className="flex-1 min-h-0">
        <ChatBody />
      </div>
    </div>
  );
};

export default LandingPage