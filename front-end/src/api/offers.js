import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const getOffers = (id) => axios.get(`${API_URL}/offers/${id}`);