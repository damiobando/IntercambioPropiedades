const mongoose = require("mongoose");
// Schema for Notification class
const notificationSchema = new mongoose.Schema({
    user_id: String,
    content: String,
    date: String,
    read:Boolean,
});
module.exports = mongoose.model("Notification",notificationSchema);