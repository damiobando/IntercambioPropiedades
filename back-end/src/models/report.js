const mongoose = require("mongoose");

// Schema for Report class
const reportSchema = new mongoose.Schema({
    reporter_id: {
        type: String,
        required: true
    },
    reported_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Report",reportSchema);