const express = require("express");
const Offer = require("../models/offer"); // Importa el modelo Offer
const User = require("../models/user");
const Property = require("../models/property");
const router = express.Router();

// Crear una nueva oferta
router.post("/offers", (req, res) => {
    const offerData = req.body;
    Offer.create(offerData)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todas las ofertas
router.get("/offers", (req, res) => {
    Offer.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener una oferta específica por ID
router.get("/offers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // Obtener todas las ofertas del usuario
        const userOffers = await Offer.find({ owner_id: id });
        // Crear un nuevo array con la información deseada
        const formattedOffers = await Promise.all(userOffers.map(async (offer) => {
            // Obtener información del usuario ofertado
            // Obtener información de la propiedad
            const propertyInfo = await Property.findById(offer.property_id);

            return {
                offerorName: offer.oferter,
                offerorEmail: offer.contact,
                propertyTitle: propertyInfo.title,
                offeredAmount: offer.offeredAmount,
                offerDetail: offer.offerDetail,
                offerId: offer._id,
            };
        }));
        res.json({ offers: formattedOffers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las ofertas del usuario' });
    }
});



// Actualizar una oferta por ID
router.put("/offers/:id", (req, res) => {
    const { id } = req.params;
    const offerData = req.body;
    Offer.findByIdAndUpdate(id, offerData, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar una oferta por ID
router.delete("/offers/:id", (req, res) => {
    const { id } = req.params;
    Offer.deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 1) {
                res.json({ message: "Offer deleted successfully" });
            } else {
                res.status(404).json({ message: "Offer not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
