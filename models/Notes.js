const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  notes: String,
});

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
