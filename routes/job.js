const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  const searchJob = req.query.search;
  console.log(searchJob);

  axios
    .get(
      `http://api.adzuna.com/v1/api/jobs/de/search/1?app_id=${process.env.ADZUNA_ID}&app_key=${process.env.ADZUNA_KEY}&results_per_page=100&content-type=application/json`
    )
    .then((response) => {
      res.json(response.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
