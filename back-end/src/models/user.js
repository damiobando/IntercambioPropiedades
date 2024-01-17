const mongoose = require("mongoose");
// Schema for User class
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User",userSchema);