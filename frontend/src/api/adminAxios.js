import axios from "axios";

// Ensure cookies are sent with ALL axios requests
axios.defaults.withCredentials = true;

let BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Check if running in Electron (desktop app)
const isElectron = window && window.electronAPI;

// For Electron app, use localhost in development, production URL otherwise
if (isElectron) {
  // In Electron development, connect to localhost
  if (import.meta.env.DEV) {
    BASE_URL = 'http://localhost:5000';
  } else {
    // In Electron production, use the production URL
    BASE_URL = 'https://macview-travels-website-production.up.railway.app';
  }
}

// Ensure the URL has a protocol
if (BASE_URL && !BASE_URL.startsWith('http://') && !BASE_URL.startsWith('https://')) {
  BASE_URL = `https://${BASE_URL}`;
}

// Debug logging to verify the URL

const adminAxios = axios.create({
  baseURL: `${BASE_URL}/api/admin`, // backend admin route base
  withCredentials: true, // Required for cookies to be sent with requests
});

// Auto attach token for every request
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
      // Avoid sending invalid tokens (e.g. string "undefined")
      if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
adminAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // For admin tokens, don't try to refresh - just clear the token
      // Admin will need to log in again
      localStorage.removeItem("adminToken");

      // You could emit an event or show a notification here
      console.warn("Admin session expired. Please log in again.");

      // Reject the request - the UI should handle redirecting to login
      return Promise.reject({
        ...error,
        message: "Admin session expired. Please log in again."
      });
    }

    return Promise.reject(error);
  }
);

export default adminAxios;
