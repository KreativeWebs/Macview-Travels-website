
import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://macview-travels-website-production.up.railway.app";
const fullBaseURL = BASE_URL.startsWith('http') ? BASE_URL : `https://${BASE_URL}`;

const userAxios = axios.create({
  baseURL: `${fullBaseURL}/api`,
  withCredentials: true, // To send cookies like refreshToken
});

// Automatically attach token
userAxios.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
userAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh token
        const refreshResponse = await axios.post(`${fullBaseURL}/api/refresh`, {}, { withCredentials: true });
        const { accessToken, user } = refreshResponse.data;
        // Update store
        useAuthStore.getState().setAccessToken(accessToken);
        useAuthStore.getState().setUser(user);
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return userAxios(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default userAxios;
