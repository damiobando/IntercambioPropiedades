const express = require("express");
const  Favorites  = require("../models/favorite"); // Importa el modelo Favorites
const jwt = require("jsonwebtoken");
const router = express.Router();
const Property = require("../models/property");

// Crear un nuevo favorito
router.post("/favorites", async (req, res) => {
  try {
    const favoriteData = req.body;
    const decodedToken = jwt.decode(favoriteData.user_id);
    favoriteData.user_id = decodedToken.id;

    // Verificar si ya existe un favorito con el mismo property_id y user_id
    const existingFavorite = await Favorites.findOne({
      user_id: favoriteData.user_id,
      property_id: favoriteData.property_id,
    });

    if (existingFavorite) {
      return res.status(409).json({ message: "La propiedad ya está en favoritos." });
    }

    // Si no existe, crea el nuevo favorito
    const newFavorite = await Favorites.create(favoriteData);
    res.json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

          // Verifica si propertyDetails es null antes de agregarlo al array
          if (propertyDetails !== null) {
              propertyDetailsArray.push(propertyDetails);
          }
      }

      res.json(propertyDetailsArray);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Obtener un favorito específico por ID


// Actualizar un favorito por ID
router.put("/favorites/:id", (req, res) => {
    const { id } = req.params;
    const favoriteData = req.body;
    Favorites.findByIdAndUpdate(id, favoriteData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar un favorito por ID
router.delete("/favorites/:propertyId", (req, res) => {
  const { propertyId } = req.params;
  Favorites.deleteOne({ property_id: propertyId })
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
