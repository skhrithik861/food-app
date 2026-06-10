import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

if (typeof window !== "undefined") {
  window.__API_BASE_URL = BASE_URL;
  console.info("API base URL in frontend:", BASE_URL || "<relative>");
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
