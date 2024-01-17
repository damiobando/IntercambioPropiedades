import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const findUserById = (id) => axios.get(`${API_URL}/users/byId/${id}`);
export const findUserByToken = (token) => axios.get(`${API_URL}/users/byToken/${token}`);