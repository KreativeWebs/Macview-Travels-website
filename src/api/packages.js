import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin";

export const getPackages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages`);
    return response.data.packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getPackageById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages/${id}`);
    return response.data.package;
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
};
