const mongoose = require("mongoose");

// Schema for Favorites class
const favoriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});
module.exports = mongoose.model("Favorite",favoriteSchema);