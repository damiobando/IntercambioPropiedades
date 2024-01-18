const mongoose = require("mongoose");
// Schema for Preference class
const preferenceSchema = new mongoose.Schema({
    user_id : String,
    propertyType: String,
    financingType: String,
});
module.exports = mongoose.model("Preference",preferenceSchema);