const express = require('express');
const router = express.Router();
const api = require('../services/api');

/* GET sites page. */
router.get('/', function(req, res, next) {
  api.getSites().then((sites => {
    res.render('sites', { sites: sites });
  }))
});

module.exports = router;
