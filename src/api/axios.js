// import axios from "axios"; 
// const baseURL = import.meta.env.VITE_API_BASE_URL 
// const api = axios.create({ 
//  baseURL, 
// }); 
// api.interceptors.request.use((config) => { 
//  const token = localStorage.getItem("token"); // get JWT  
//  if (token) { 
//  config.headers.Authorization = `Bearer ${token}`;  } 
//  return config; 
// }); 
// export default api; 






// code for http only cookie implementation

// import axios from "axios";

// const baseURL = import.meta.env.VITE_API_BASE_URL;

// const api = axios.create({
//   baseURL,
//   withCredentials: true, // 🔥 VERY IMPORTANT (sends cookies automatically)
// });

// export default api;








import axios from "axios";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


import { triggerLogout } from "../context/authStore";



const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true, // VERY IMPORTANT (for cookies)
});







// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (!error.response) {
//       return Promise.reject(error);
//     }

//     // Only handle ACCESS expired
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await api.post("/auth/refresh");
//         return api(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );



// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (!error.response) {
//       return Promise.reject(error);
//     }

//     // 🔥 Access expired → refresh available
//     if (
//       error.response.status === 403 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         await api.post("/auth/refresh");
//         return api(originalRequest);
//       } catch (refreshError) {

//         await api.post("/auth/logout"); // Invalidate session on backend
       
//        return Promise.reject(refreshError);
//       }
//     }

//     // 🔥 Refresh expired OR invalid
//     if (error.response.status === 401) {
//      await api.post("/auth/logout"); // Invalidate session on backend
      
//     return Promise.reject(error);
//   }
// }
// );




api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    // 🔥 Access expired
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        triggerLogout(); // 👈 THIS calls your AuthContext logout
        return Promise.reject(refreshError);
      }
    }

    // 🔥 Refresh expired
    if (error.response.status === 401) {
      triggerLogout();
    }

    return Promise.reject(error);
  }
);





export default api;










// code for http only cookie implementation with refresh token


// import axios from "axios";

// const baseURL = import.meta.env.VITE_API_BASE_URL;

// const api = axios.create({
//   baseURL,
//   withCredentials: true, // VERY IMPORTANT (for cookies)
// });

// let isRefreshing = false;
// let failedQueue = [];

// // Helper to process queued requests
// const processQueue = (error) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve();
//     }
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (!error.response) {
//       return Promise.reject(error);
//     }

//     const { status } = error.response;

//     // 🔴 CASE 1: Access expired but refresh available
//     if (status === 403 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // If refresh already happening, queue this request
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => api(originalRequest));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         await api.post("/auth/refresh");

//         processQueue(null);
//         isRefreshing = false;

//         // Retry original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         isRefreshing = false;

//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     // 🔴 CASE 2: Refresh expired OR invalid
//     if (status === 401) {
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
