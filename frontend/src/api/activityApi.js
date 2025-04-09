import axios from "axios";

const API_BASE = "http://localhost:9090"; // Spring Cloud Gateway

export const getAllActivities = async () => {
  const response = await axios.get(`${API_BASE}/activities`);
  return response.data;
};
