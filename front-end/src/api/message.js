import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const sendMessage = (message) => axios.post(`${API_URL}/messages`, message);
