const mongoose = require("mongoose");
// Schema for Offer class
const offerSchema = new mongoose.Schema({
    oferter: String,
    contact: String,
    owner_id: String,
    property_id: String,
    offeredAmount: String,
    offerDetail: String,
});
module.exports = mongoose.model("Offer",offerSchema);