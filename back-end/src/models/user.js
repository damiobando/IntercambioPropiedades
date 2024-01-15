const mongoose = require("mongoose");
// Schema for User class
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

module.exports = mongoose.model("User",userSchema);