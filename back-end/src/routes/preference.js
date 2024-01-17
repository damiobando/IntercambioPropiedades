const express = require("express");
const Preference = require("../models/preference"); // Importa el modelo Preference

const router = express.Router();

// Crear una nueva preferencia
router.post("/preferences", (req, res) => {
    const preferenceData = req.body;
    Preference.create(preferenceData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todas las preferencias
router.get("/preferences", (req, res) => {
    Preference.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener una preferencia específica por ID
router.get("/preferences/:id", (req, res) => {
    const { id } = req.params;
    Preference.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Actualizar una preferencia por ID
router.put("/preferences/:id", (req, res) => {
    const { id } = req.params;
    const preferenceData = req.body;
    Preference.findByIdAndUpdate(id, preferenceData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar una preferencia por ID
router.delete("/preferences/:id", (req, res) => {
    const { id } = req.params;
    Preference.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Preference deleted successfully" });
            } else {
                res.status(404).json({ message: "Preference not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
