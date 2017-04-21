var express = require('express');
var router = express.Router();
var NoteData = require('../models/notesData.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(req.session);
	if (req.cookies.islogin) {
		console.log('cookies:' + req.cookies.islogin);
		req.session.username = req.cookies.islogin;
	}
	if (req.session.username) {
		console.log('session:' + req.session.username);
		res.locals.username = req.session.username;
	} else {
		res.redirect('/login');
		return;
	}

	NoteData.findNotes(req.session.username, function(err, result) {
		if (err) {
			console.log('笔记获取失败！');
			res.render('index', {
				title: '主页'
			});
			return;
		}
		// console.log(result);
		res.locals.notes = result;
		res.render('index', {
			title: '主页'
		});
	});
});


module.exports = router;