import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const sendMessage = (message) => axios.post(`${API_URL}/messages`, message);
export const getMessages = (id) => axios.get(`${API_URL}/messages/${id}`);
