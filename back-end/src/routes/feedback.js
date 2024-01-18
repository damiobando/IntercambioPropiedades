const express = require("express");
const Feedback = require("../models/feedback"); // Importa el modelo Feedback

const router = express.Router();

// Crear un nuevo feedback
router.post("/feedbacks", (req, res) => {
    const feedbackData = req.body;
    Feedback.create(feedbackData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todos los feedbacks
router.get("/feedbacks", (req, res) => {
    Feedback.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener un feedback específico por ID
router.get("/feedbacks/:id", (req, res) => {
    const { id } = req.params;
    Feedback.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Actualizar un feedback por ID
router.put("/feedbacks/:id", (req, res) => {
    const { id } = req.params;
    const feedbackData = req.body;
    Feedback.findByIdAndUpdate(id, feedbackData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar un feedback por ID
router.delete("/feedbacks/:id", (req, res) => {
    const { id } = req.params;
    Feedback.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Feedback deleted successfully" });
            } else {
                res.status(404).json({ message: "Feedback not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
