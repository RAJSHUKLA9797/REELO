const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  subject: String,
  topic: String,
  difficulty: String,
  marks: Number,
});

module.exports = mongoose.model("question", questionSchema);
