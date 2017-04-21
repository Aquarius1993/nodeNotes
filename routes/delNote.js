var express = require('express');
var router = express.Router();
var NoteData = require('../models/notesData.js');

router.get('/', function(req, res) {
	var id = req.query.id;
	console.log(id);
	NoteData.delNote(id, function(err, result) {
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

module.exports = router;