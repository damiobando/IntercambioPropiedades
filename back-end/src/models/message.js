const mongoose = require("mongoose");
// Schema for Message class
const messageSchema = new mongoose.Schema({
    sender_id: String,
    receiver_id: String,
    content: String,
    date: String,
});
module.exports = mongoose.model("Message",messageSchema);