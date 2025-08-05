import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7001",
});

export default api;
