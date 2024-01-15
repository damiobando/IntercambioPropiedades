const mongoose = require("mongoose");
// Schema for Preference class
const preferenceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    preference: String
});
module.exports = mongoose.model("Preference",preferenceSchema);