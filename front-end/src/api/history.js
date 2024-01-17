import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const getSearchHistory = (id) => axios.get(`${API_URL}/history/${id}`);