const mongoose = require("mongoose");
// Schema for Notification class
const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: String,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Notification",notificationSchema);