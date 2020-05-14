const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: String,
  number: String,
  description: String,
  imageUrl: String,
  github: String,
  heroku: String,
  contributors: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Project = model("Project", projectSchema);

module.exports = Project;
