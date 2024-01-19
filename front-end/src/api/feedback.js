import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const getAllFeedback = () => axios.get(`${API_URL}/feedbacks`);
export const createFeedback = (feedback) => axios.post(`${API_URL}/feedbacks`, feedback);