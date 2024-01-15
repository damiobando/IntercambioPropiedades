const express = require("express");
const  Favorites  = require("../models/favorite"); // Importa el modelo Favorites

const router = express.Router();

// Crear un nuevo favorito
router.post("/favorites", (req, res) => {
    const favoriteData = req.body;
    Favorites.create(favoriteData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todos los favoritos
router.get("/favorites", (req, res) => {
    Favorites.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener un favorito específico por ID
router.get("/favorites/:id", (req, res) => {
    const { id } = req.params;
    Favorites.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Actualizar un favorito por ID
router.put("/favorites/:id", (req, res) => {
    const { id } = req.params;
    const favoriteData = req.body;
    Favorites.findByIdAndUpdate(id, favoriteData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar un favorito por ID
router.delete("/favorites/:id", (req, res) => {
    const { id } = req.params;
    Favorites.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Favorite deleted successfully" });
            } else {
                res.status(404).json({ message: "Favorite not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
