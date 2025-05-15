import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized. Logging out...");
      localStorage.clear();
      window.location.href = "/login";
    }

    if (status === 403) {
      alert("Access denied. You are not authorized.");
    }

    if (status >= 500) {
      console.error(
        "Server error:",
        error.response?.data?.message || "Internal Server Error"
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
