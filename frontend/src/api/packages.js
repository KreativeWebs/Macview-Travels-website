import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getPackages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/packages`);
    return response.data.packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/packages/${id}`);
    return response.data.package;
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
};
