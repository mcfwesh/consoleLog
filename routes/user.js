const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const axios = require("axios");

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
  User.findByIdAndDelete(req.params.id)
    .then((project) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      res.json(err);
    });
});
router.put("/:id", (req, res) => {
  const {
    username,
    password,
    name,
    surname,
    role,
    description,
    specialization,
    imageUrl,
    github,
    codewars,
    linkedin,
    classroom,
  } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    {
      username,
      password,
      name,
      surname,
      role,
      description,
      specialization,
      imageUrl,
      github,
      codewars,
      linkedin,
      classroom,
    },
    { new: true }
  )
    .then((pro) => {
      res.status(200).json(pro);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/codewars/:name", (req, res) => {
  const userCodeCodeWars = req.params.name;

  axios({
    url: `https://www.codewars.com/api/v1/users/${userCodeCodeWars}/code-challenges/completed?page=0`,
    method: "get",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
