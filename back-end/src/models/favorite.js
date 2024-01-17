const mongoose = require("mongoose");

// Schema for Favorites class
const favoriteSchema = new mongoose.Schema({
    user_id: String,
    property_id: String,
});
module.exports = mongoose.model("Favorite",favoriteSchema);