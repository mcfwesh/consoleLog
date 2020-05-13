const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    surname: String,
    role: String,
    description: String,
    specialization: { type: Array },
    picture: String,
    github: String,
    codewars: String,
    linkedin: String,
    teachers: [Object],
    // teachers: [{ name: String, mail: String, linkedin: String }],
    classroom: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
