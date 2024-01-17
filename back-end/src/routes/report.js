const express = require("express");
const Report = require("../models/report"); // Importa todos los modelos que has definido

const router = express.Router();

// Routes for 'Report' schema
router.post("/reports", (req, res) => {
    const reportData = req.body;
    Report.create(reportData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

router.get("/reports", (req, res) => {
    Report.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

router.get("/reports/:id", (req, res) => {
    const { id } = req.params;
    Report.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

router.put("/reports/:id", (req, res) => {
    const { id } = req.params;
    const reportData = req.body;
    Report.findByIdAndUpdate(id, reportData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

router.delete("/reports/:id", (req, res) => {
    const { id } = req.params;
    Report.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Report deleted successfully" });
            } else {
                res.status(404).json({ message: "Report not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});


module.exports = router;
