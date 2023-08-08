import axios from "axios";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const axiosInstance = axios.create({
  baseURL: URL, // Replace with your API URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
