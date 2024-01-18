import axios from "axios";

const API_URL = "http://localhost:9000/api";

export const addNotification = (notification) => axios.post(`${API_URL}/notifications`, notification);
export const getNotifications = (userId) => axios.get(`${API_URL}/notifications/${userId}`);
export const markNotificationAsRead = (notificationId) => axios.put(`${API_URL}/notifications/${notificationId}`);
export const deleteNotification = (notificationId) => axios.delete(`${API_URL}/notifications/${notificationId}`);
