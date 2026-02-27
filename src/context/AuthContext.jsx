// import { createContext, useEffect, useState } from "react";
// import api from "../api/axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loading, setLoading] = useState(true);

//   // Save token
//   useEffect(() => {
//     if (token) localStorage.setItem("token", token);
//     else localStorage.removeItem("token");
//   }, [token]);

//   // 🔥 Restore user using token + userId
//   useEffect(() => {
//     const restoreUser = async () => {
//       const storedToken = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       if (!storedToken || !userId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.get(`/users/${userId}`);
//         setUser(res.data.user || res.data);
//       } catch (err) {
//         console.error("Restore user failed", err);
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem("token");
//         localStorage.removeItem("userId");
//       } finally {
//         setLoading(false);
//       }
//     };

//     restoreUser();
//   }, []);

//   const login = (userData, jwtToken) => {
//     setUser(userData);
//     setToken(jwtToken);
//     localStorage.setItem("userId", userData._id);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//   };

//   if (loading) return null; // or spinner

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// code for http only cookie implementation

import { createContext, useEffect, useState } from "react";
import api from "../api/axios";


import { setLogoutHandler } from "./authStore";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed", err);
    }
    setUser(null);
  };

  // 🔥 Register logout globally
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
