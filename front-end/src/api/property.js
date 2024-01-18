import axios from "axios";

const API_URL = "http://localhost:9000/api";

//NECESITO UNA RUTA PARA AGREGAR UNA PROPIEDAD
export const addProperty = (property) => axios.post(`${API_URL}/properties`, property);
export const getProperty = (id) => axios.get(`${API_URL}/properties/${id}`);
export const getProperties = () => axios.get(`${API_URL}/properties`);
export const getUserProperties = (id) => axios.get(`${API_URL}/user-properties/${id}`);
export const deleteProperty = (id) => axios.delete(`${API_URL}/properties/${id}`);