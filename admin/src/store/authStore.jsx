import React from "react";
import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.DEV ? "" : (import.meta.env.VITE_API_BASE_URL || "https://macview-travels-website-production.up.railway.app");
const fullBaseURL = BASE_URL ? (BASE_URL.startsWith('http') ? BASE_URL : `https://${BASE_URL}`) : "";

// Allow cookies to be sent (Refresh Token is in cookie)
axios.defaults.withCredentials = true;



export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
  fetchingUser: false,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),

  signup: async (firstName, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${fullBaseURL}/api/signup`, { firstName, email, password });

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
      const res = await axios.post(`${fullBaseURL}/api/login`, { email, password });

      set({
        user: res.data.user,
        accessToken: res.data.accessToken, // store access token in memory
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
      const res = await axios.post(`${fullBaseURL}/api/refresh`, {}, { withCredentials: true });

      set({ user: res.data.user, accessToken: res.data.accessToken });
      return res.data.accessToken;
    } catch (err) {
      console.warn("refreshAccessToken failed:", err.response?.status, err.response?.data);
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

      const res = await axios.get(`${fullBaseURL}/api/fetchuser`, {
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
      await axios.post(`${fullBaseURL}/api/logout`);
      set({ user: null, accessToken: null, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  adminLogout: async () => {
    set({ isLoading: true });
    try {
      await axios.post(`${fullBaseURL}/api/logout`);
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
      const res = await axios.post(`${fullBaseURL}/api/admin/login`, { email, password });

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
