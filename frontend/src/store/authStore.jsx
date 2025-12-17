import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Allow cookies to be sent (Refresh Token is in cookie)
axios.defaults.withCredentials = true;



export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
  fetchingUser: false,

  signup: async (firstName, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/signup`, { firstName, email, password });

      set({
        user: res.data.user,
        accessToken: res.data.accessToken,
        isLoading: false,
      });

      return { success: true };
    } catch (err) {
      set({
        isLoading: false,
        error: "Signup failed",
      });

      return {
        success: false,
        status: err.response?.status,
      };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });

      set({
        user: res.data.user,
        accessToken: res.data.accessToken, // ✅ store access token in memory
        isLoading: false,
      });

      return { success: true };
    } catch (err) {
      set({
        isLoading: false,
        error: err.response?.data?.message || "Login failed",
      });
      return { success: false };
    }
  },

  refreshAccessToken: async () => {
    try {
      const res = await axios.post(`${API_URL}/refresh`);

      set({ user: res.data.user, accessToken: res.data.accessToken });
      return res.data.accessToken;
    } catch {
      set({ user: null, accessToken: null });
      return null;
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true });
    try {
      let token = get().accessToken;

      // If we don't have an access token in memory, try to refresh first
      if (!token) {
        token = await get().refreshAccessToken();
        if (!token) {
          set({ user: null, fetchingUser: false });
          return;
        }
      }

      const res = await axios.get(`${API_URL}/fetchuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: res.data.user, fetchingUser: false });
    } catch {
      const newToken = await get().refreshAccessToken();

      if (newToken) return get().fetchUser();

      set({ user: null, fetchingUser: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, accessToken: null, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  adminLogout: async () => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/logout`);
      // Clear admin token from localStorage
      localStorage.removeItem('adminToken');
      set({ user: null, accessToken: null, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  adminLogin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/admin/login`, { email, password });

      // Store token in localStorage for adminAxios
      localStorage.setItem('adminToken', res.data.accessToken);

      set({
        user: res.data.user,
        accessToken: res.data.accessToken,
        isLoading: false,
      });

      return { success: true, message: res.data.message };
    } catch (err) {
      set({
        isLoading: false,
        error: err.response?.data?.message || "Admin login failed",
      });
      return { success: false, message: err.response?.data?.message || "Admin login failed" };
    }
  },
}));

// Axios Interceptor to auto-attach access token
axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
