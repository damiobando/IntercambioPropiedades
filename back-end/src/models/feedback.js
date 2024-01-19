const mongoose = require("mongoose");
// Schema for Feedback class
const feedbackSchema = new mongoose.Schema({
    user_id: String,
    userName: String,
    comment: String,
    rating: Number
});
module.exports = mongoose.model("Feedback",feedbackSchema);