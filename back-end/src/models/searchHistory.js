const mongoose = require("mongoose");
// Schema for Search History class
const searchHistorySchema = new mongoose.Schema({
    user_id: String,
    property_id:String,
    date: String,
});
module.exports = mongoose.model("SearchHistory",searchHistorySchema);