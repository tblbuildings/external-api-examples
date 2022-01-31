var express = require('express');
var router = express.Router();

/* GET sites list. */
router.get('/', function(req, res, next) {
	res.render('sites', { title: 'Express' });
});

module.exports = router;
