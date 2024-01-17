import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const getFavorites = (id) => axios.get(`${API_URL}/favorites/${id}`);