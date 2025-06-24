const express = require("express");
const router = express.Router();
const api = require("../services/api");

/* GET IAQ for sites page. */
router.get("/", function (req, res, next) {
  api.getSitesIaq().then((sitesIaq) => {
    res.render("iaq", { sitesIaq: sitesIaq });
  });
});

router.get("/:id", function (req, res, next) {
  const systemId = Number(req.params.id);
  if (!systemId) {
    return res.status(400).send("systemId query parameter is required");
  }
  const now = new Date();
  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  ); // 1 day ago
  api.getHistoricalDataV2(startDate, now, systemId).then((sitesIaq) => {
    res.status(200).json(sitesIaq);
  });
});

module.exports = router;
