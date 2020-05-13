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
    teachers: {
      type: String,
      enum: [
        "Jan",
        "Markus",
        "Andre",
        "Alfonso",
        "Jeff",
        // { name: "Jan", mail: "Jan@ironhack.com", linkedin: "www.linkedin.com" },
        // {
        //   name: "Markus",
        //   mail: "Markus@ironhack.com",
        //   linkedin: "www.linkedin.com",
        // },
        // {
        //   name: "Andre",
        //   mail: "Andre@ironhack.com",
        //   linkedin: "www.linkedin.com",
        // },
        // {
        //   name: "Jeff",
        //   mail: "Jeff@ironhack.com",
        //   linkedin: "www.linkedin.com",
        // },
        // {
        //   name: "Alfonso",
        //   mail: "Alfonso@ironhack.com",
        //   linkedin: "www.linkedin.com",
        // },
      ],
    },
    classroom: { type: String, enum: ["Web dev", "UX/UI", "Data Analysis"] },
    year: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
