const mongoose = require("mongoose");

// Schema for Report class
const reportSchema = new mongoose.Schema({
    reporter_id:String,
    reported_id:String,
    description: String,
    date: String,
});
module.exports = mongoose.model("Report",reportSchema);