let mongoose    = require("mongoose");

const RecomSchema = new mongoose.Schema({
  recom:{
    type:String,
    required:true
  },
  tags:[String]
});

module.exports = mongoose.model("Recom", RecomSchema);


