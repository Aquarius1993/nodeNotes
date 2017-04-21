var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.destroy();
	res.clearCookie('islogin');
	res.redirect('/login');
});

module.exports = router;