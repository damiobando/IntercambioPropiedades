const express = require("express");
const  Message  = require("../models/message"); // Importa el modelo Message

const router = express.Router();

// Create a new message
router.post("/messages", (req, res) => {
    const messageData = req.body;
    Message.create(messageData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Get all messages
router.get("/messages", (req, res) => {
    Message.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Get a specific message by ID
router.get("/messages/:id", (req, res) => {
    const { id } = req.params;
    Message.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Update a message by ID
router.put("/messages/:id", (req, res) => {
    const { id } = req.params;
    const messageData = req.body;
    Message.findByIdAndUpdate(id, messageData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Delete a message by ID
router.delete("/messages/:id", (req, res) => {
    const { id } = req.params;
    Message.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Message deleted successfully" });
            } else {
                res.status(404).json({ message: "Message not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
