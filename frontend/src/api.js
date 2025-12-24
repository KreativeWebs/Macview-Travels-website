import axios from "axios";

const baseURL = import.meta.env.DEV ? "http://localhost:5000" : (import.meta.env.VITE_API_BASE_URL || "https://macview-travels-website-production.up.railway.app");
const fullBaseURL = baseURL.startsWith('http') ? baseURL : `https://${baseURL}`;

const instance = axios.create({
  baseURL: fullBaseURL,
});

export default instance;
