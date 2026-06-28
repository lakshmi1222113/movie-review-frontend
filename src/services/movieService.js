import axios from "axios";

const BASE_URL = "https://movie-review-backend-vlzn.onrender.com";

export const getTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/tmdb/trending`);
  return res.data; // ✅ array
};

export const getPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/tmdb/popular`);
  return res.data; // ✅ array
};

export const searchMovies = async (query) => {
  const res = await axios.get(`${BASE_URL}/tmdb/search`, {
    params: { query },
  });
  return res.data; // ✅ array
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/tmdb/${id}`);
  return res.data; // ✅ object
};