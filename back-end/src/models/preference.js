const mongoose = require("mongoose");
// Schema for Preference class
const preferenceSchema = new mongoose.Schema({
    propertyType: String,
    financingType: String,
});
module.exports = mongoose.model("Preference",preferenceSchema);