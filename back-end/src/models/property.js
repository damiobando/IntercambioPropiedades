const mongoose = require("mongoose");
// Schema for Property class
const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    paymentMethod: String,
    financingOptions: Array,
    province: String,
    canton: String,
    distrito: String,
    images: Array,
    direccion: String,
    ownerID: String,
});
module.exports = mongoose.model("Property",propertySchema);