import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL API backend SQL
});
// console.log("API URL:", import.meta.env.VITE_API_URL);

export default api;
