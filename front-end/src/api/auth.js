import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const registerRequest = (user) => axios.post(`${API_URL}/register`, user);

//necesitamos la ruta para obtener los usuarios
export const getUsers = () => axios.get(`${API_URL}/users`);

