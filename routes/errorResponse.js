const express = require("express");
const router = express.Router();
const api = require("../services/api");

/* GET IAQ for sites page. */
router.get("/", async function (req, res, next) {
  await api.errorExample().then((error) => {
    res.render("error-response", { errors: error });
  });
});

module.exports = router;
