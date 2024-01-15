const express = require("express");
const SearchHistory = require("../models/searchHistory"); // Importa el modelo SearchHistory

const router = express.Router();

// Crear un nuevo historial de búsqueda
router.post("/searchhistory", (req, res) => {
    const searchHistoryData = req.body;
    SearchHistory.create(searchHistoryData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todo el historial de búsqueda
router.get("/searchhistory", (req, res) => {
    SearchHistory.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener un historial de búsqueda específico por ID
router.get("/searchhistory/:id", (req, res) => {
    const { id } = req.params;
    SearchHistory.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
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
router.delete("/searchhistory/:id", (req, res) => {
    const { id } = req.params;
    SearchHistory.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Search history deleted successfully" });
            } else {
                res.status(404).json({ message: "Search history not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
