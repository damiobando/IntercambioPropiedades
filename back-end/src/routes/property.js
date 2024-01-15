const express = require("express");
const Property = require("../models/property"); // Importa el modelo Property

const router = express.Router();

// Crear una nueva propiedad
router.post("/properties", (req, res) => {
    const propertyData = req.body;
    Property.create(propertyData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todas las propiedades
router.get("/properties", (req, res) => {
    Property.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener una propiedad específica por ID
router.get("/properties/:id", (req, res) => {
    const { id } = req.params;
    Property.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Actualizar una propiedad por ID
router.put("/properties/:id", (req, res) => {
    const { id } = req.params;
    const propertyData = req.body;
    Property.findByIdAndUpdate(id, propertyData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar una propiedad por ID
router.delete("/properties/:id", (req, res) => {
    const { id } = req.params;
    Property.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Property deleted successfully" });
            } else {
                res.status(404).json({ message: "Property not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
