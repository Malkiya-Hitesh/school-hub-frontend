import axios from "axios";

const normalizeBaseUrl = (value) => (value || "/api").replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL),
  withCredentials: true, // cookies send karva mate
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;