let mongoose = require("mongoose");

const RecomSchema = new mongoose.Schema({
  recom: {
    type: String,
    required: true
  },
  tag: String
});

module.exports = mongoose.model("Recom", RecomSchema);