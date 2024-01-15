const mongoose = require("mongoose");
// Schema for Feedback class
const feedbackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comment: String,
    rating: Number
});
module.exports = mongoose.model("Feedback",feedbackSchema);