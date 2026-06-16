import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // cookies send karva mate
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;