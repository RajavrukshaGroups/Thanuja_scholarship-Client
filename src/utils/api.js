import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   REQUEST INTERCEPTOR
================================ */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("scholarToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ===============================
   RESPONSE INTERCEPTOR
================================ */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    // Auto logout if token expired
    if (error.response?.status === 401) {
      localStorage.removeItem("scholarToken");
      localStorage.removeItem("scholarUser");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
