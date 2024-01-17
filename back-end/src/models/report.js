const mongoose = require("mongoose");

// Schema for Report class
const reportSchema = new mongoose.Schema({
    reporter_id:String,
    reported_name:String,
    type: String,
    description: String
});
module.exports = mongoose.model("Report",reportSchema);