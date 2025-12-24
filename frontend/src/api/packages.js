import axios from "axios";

const BASE_URL = import.meta.env.DEV ? "http://localhost:5000" : (import.meta.env.VITE_API_BASE_URL || "https://macview-travels-website-production.up.railway.app");
const fullBaseURL = BASE_URL.startsWith('http') ? BASE_URL : `https://${BASE_URL}`;

export const getPackages = async () => {
  try {
    const response = await axios.get(`${fullBaseURL}/api/packages`);
    return response.data.packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await axios.get(`${fullBaseURL}/api/packages/${id}`);
    return response.data.package;
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
};
