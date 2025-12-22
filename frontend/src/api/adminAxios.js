import axios from "axios";

const adminAxios = axios.create({
  baseURL: "VITE_API_BASE_URL/api/admin", // backend admin route base
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

// Response interceptor to handle token refresh
adminAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(`${BASE_URL}/api/refresh`, {}, { withCredentials: true });

        const newToken = refreshResponse.data.accessToken;

        // Update localStorage with new token
        localStorage.setItem("adminToken", newToken);

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return adminAxios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear token and reject
        localStorage.removeItem("adminToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default adminAxios;
