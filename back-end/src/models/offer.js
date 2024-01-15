const mongoose = require("mongoose");
// Schema for Offer class
const offerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    offered_amount: Number
});
module.exports = mongoose.model("Offer",offerSchema);