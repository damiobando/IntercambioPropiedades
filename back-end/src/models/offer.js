const mongoose = require("mongoose");
// Schema for Offer class
const offerSchema = new mongoose.Schema({
    user_id: String,
    property_id: String,
    offered_amount: Number
});
module.exports = mongoose.model("Offer",offerSchema);