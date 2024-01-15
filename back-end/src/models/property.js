const mongoose = require("mongoose");
// Schema for Property class
const propertySchema = new mongoose.Schema({
    name: String,
    location: String,
    extension: String,
    price: Number,
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
module.exports = mongoose.model("Property",propertySchema);