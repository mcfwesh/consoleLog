const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  // check if req.params.id is valid, if not respond with a 4xx status code
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json(user);
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  console.log("this is req", req.params.id);
  User.findByIdAndDelete(req.params.id)
    .then((project) => {
      //console.log("this is project", project);

      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
