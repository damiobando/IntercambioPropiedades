const express = require("express");
const Notification = require("../models/notification"); // Importa el modelo Notification

const router = express.Router();

// Crear una nueva notificación
router.post("/notifications", (req, res) => {
    const notificationData = req.body;
    Notification.create(notificationData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todas las notificaciones
router.get("/notifications", (req, res) => {
    Notification.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener una notificación específica por ID
router.get("/notifications/:id", (req, res) => {
    const { id } = req.params;
    Notification.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Actualizar una notificación por ID
router.put("/notifications/:id", (req, res) => {
    const { id } = req.params;
    const notificationData = req.body;
    Notification.findByIdAndUpdate(id, notificationData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar una notificación por ID
router.delete("/notifications/:id", (req, res) => {
    const { id } = req.params;
    Notification.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Notification deleted successfully" });
            } else {
                res.status(404).json({ message: "Notification not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
