const mongoose = require("mongoose");
// Schema for Search History class
const searchHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    term: String,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("SearchHistory",searchHistorySchema);