import axios from "axios";

const BASE_URL = "https://movie-review-backend-vlzn.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;