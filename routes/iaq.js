const express = require('express');
const router = express.Router();
const api = require('../services/api');

/* GET IAQ for sites page. */
router.get('/', function (req, res, next) {
	api.getSitesIaq().then((sitesIaq => {
		res.render('iaq', {sitesIaq: sitesIaq});
	}))
});

module.exports = router;
