const express = require("express");
const  Favorites  = require("../models/favorite"); // Importa el modelo Favorites
const Property = require("../models/property") // Importa el modelo Property
const router = express.Router();

// Crear un nuevo favorito
router.post("/favorites", (req, res) => {
    const favoriteData = req.body;
    Favorites.create(favoriteData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todos los favoritos
router.get("/favorites/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
  
    try {
      const favorites = await Favorites.find({ user_id });
      // Array para almacenar los detalles de las propiedades
      const propertyDetailsArray = [];
      // Recorre el historial y busca detalles de cada propiedad
      for (const favoriteItem of favorites) {
        const propertyDetails = await Property.findById(favoriteItem.property_id);
        propertyDetailsArray.push(propertyDetails);
      }
  
      res.json(propertyDetailsArray);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
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
