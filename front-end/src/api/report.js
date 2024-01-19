import axios from "axios";

const API_URL = "http://localhost:9000/api";

//NECESITO UNA RUTA PARA AGREGAR UNA PROPIEDAD
export const addReport = (report) => axios.post(`${API_URL}/reports`, report);
export const getAllReports = () => axios.get(`${API_URL}/reports`);
export const deleteReport = (id) => axios.delete(`${API_URL}/reports/${id}`);