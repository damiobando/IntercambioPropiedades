const mongoose = require("mongoose");

// Schema for Report class
const reportSchema = new mongoose.Schema({
    reporter:String,
    reported_id:String,
    propertyName:String,
    description: String,
    date: String,
});
module.exports = mongoose.model("Report",reportSchema);