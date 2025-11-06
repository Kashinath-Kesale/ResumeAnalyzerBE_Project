// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000") + "/api",
  withCredentials: true,
});

// Attach Authorization header from localStorage token for every request (if present).
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore (e.g., SSR or blocked access)
  }
  return config;
});

export default api;
