const mongoose = require("mongoose");
// Schema for Message class
const messageSchema = new mongoose.Schema({
    sender_name: String,
    receiver_id: String,
    content: String,
    contact: String,
    date: String,
});
module.exports = mongoose.model("Message",messageSchema);