import axios from "axios";

const API_URL = "http://localhost:9000/api";

//NECESITO UNA RUTA PARA AGREGAR UNA PROPIEDAD
export const addProperty = (property) => axios.post(`${API_URL}/properties`, property);