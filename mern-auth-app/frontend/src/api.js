import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5050/api",
  withCredentials: false,
});

// Add token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      console.error("Unauthorized Access - redirecting to login");
      window.location.href = "/login";
    } else {
      console.error("API error:", error);
    }

    return Promise.reject(error);
  }
);

export default api;