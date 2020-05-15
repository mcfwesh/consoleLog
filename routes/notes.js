const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");

router.get("/notes", (req, res) => {
  Notes.find()
    .then(res.render(console.log("hola")))
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
