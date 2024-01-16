import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const addPreference = (preference) => axios.post(`${API_URL}/preferences`, preference);