var express = require('express');
var router = express.Router();
var NoteData = require('../models/notesData.js');

router.post('/', function(req, res) {
	var name = req.session.username;
	var title = req.body.title;
	var content = req.body.content;
	var note = new NoteData({
		title: title,
		cotent: content,
		username: name,
	});
	note.saveNote(function(err, result) {
		if (err) {
			console.log(err);
			res.render('index', {
				title: '主页'
			});
			return;
		}
		// console.log(result);
		res.redirect('/');
	});
});
router.get('/', function(req, res) {
	res.redirect('/');
});

module.exports = router;