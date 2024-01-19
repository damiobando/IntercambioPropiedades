const express = require("express");
const SearchHistory = require("../models/searchHistory");
const Property = require("../models/property") // Importa el modelo SearchHistory
const router = express.Router();

// Crear un nuevo historial de búsqueda
router.post("/history", (req, res) => {
    const searchHistoryData = req.body;
    SearchHistory.create(searchHistoryData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todo el historial de búsqueda

// Obtener un historial de búsqueda específico por ID
router.get("/history/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
      const searchHistory = await SearchHistory.find({ user_id });
      // Array para almacenar los detalles de las propiedades
      const propertyDetailsArray = [];

      // Recorre el historial y busca detalles de cada propiedad
      for (const historyItem of searchHistory) {
          const propertyDetails = await Property.findById(historyItem.property_id);

          // Verifica si propertyDetails no es null antes de agregarlo al array
          if (propertyDetails !== null) {
              propertyDetailsArray.push(propertyDetails);
          }
      }

      res.json(propertyDetailsArray);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});


// Actualizar un historial de búsqueda por ID
router.put("/searchhistory/:id", (req, res) => {
    const { id } = req.params;
    const searchHistoryData = req.body;
    SearchHistory.findByIdAndUpdate(id, searchHistoryData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar un historial de búsqueda por ID
router.delete("/history/:id", async (req, res) => {
  try {
      const { id } = req.params;

      // Cambia el campo 'userId' por el campo correcto que estás utilizando en tu modelo
      const result = await SearchHistory.deleteMany({ user_id: id });

      if (result.deletedCount > 0) {
          res.json({ message: "Search history deleted successfully" });
      } else {
          res.status(404).json({ message: "Search history not found" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
