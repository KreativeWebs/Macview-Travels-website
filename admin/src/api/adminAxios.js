import axios from "axios";

const BASE = import.meta.env.DEV ? "" : (import.meta.env.VITE_API_BASE_URL || "https://macview-travels-website-production.up.railway.app");
const normalized = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
const adminBaseURL = `${normalized}/api/admin`;

const adminAxios = axios.create({
  baseURL: adminBaseURL,
  withCredentials: true,
});

// Attach admin token from localStorage for admin requests
adminAxios.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      // debug
      console.debug("adminAxios: attaching admin token");
    } else {
      console.debug("adminAxios: no admin token found");
    }
  } catch (err) {
    // ignore
  }
  return config;
});

// On 401, redirect to admin login (so admins can re-authenticate)
adminAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      console.warn("adminAxios: received 401, redirecting to /admin/login");
      try {
        // clear token
        localStorage.removeItem('adminToken');
      } catch (e) {}
      // Use absolute path to ensure we respect basename; if served under /admin, this becomes /admin/login
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

export default adminAxios;
