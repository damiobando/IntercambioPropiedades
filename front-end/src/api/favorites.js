import axios from "axios";

const API_URL = "http://localhost:9000/api";
export const addFavorite = (favorite) => axios.post(`${API_URL}/favorites`, favorite);
export const getFavorites = (id) => axios.get(`${API_URL}/favorites/${id}`);
export const deleteFavorite = (id) => axios.delete(`${API_URL}/favorites/${id}`);
