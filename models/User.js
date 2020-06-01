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
    imageUrl: String,
    github: String,
    codewars: String,
    linkedin: String,
    teachers: [Object],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],

    classroom: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
