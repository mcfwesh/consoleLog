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

module.exports = router;
