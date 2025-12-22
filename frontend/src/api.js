import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://macview-travels-website-production.up.railway.app",
});

export default instance;
