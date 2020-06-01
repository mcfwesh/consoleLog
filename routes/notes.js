const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");

router.get("/", (req, res) => {
  Notes.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  const notes = req.body.notes;

  Notes.findByIdAndUpdate("5ebe84e95e1c38659df2e67f", {
    notes,
  })
    .then((notes) => {
      res.status(201).json(notes);
    })

    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
