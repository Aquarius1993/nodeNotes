var express = require('express');
var router = express.Router();
var NoteData = require('../models/notesData.js');
var getTime = require('../models/getDate.js')
router.get('/', function(req, res) {
	var id = req.query.id;
	NoteData.findNotesById(id, function(err, result) {
		res.locals.titleinput = result.title;
		res.locals.content = result.cotent;
		res.locals.id = id;
		res.render('listDes', {
			title: '详情'
		});
	});
});
router.post('/', function(req, res) {
	var title = req.body.title;
	var content = req.body.content;
	var id = req.body.id;
	var str = {
		'title': title,
		'cotent': content,
		'addData': getTime()
	}
	NoteData.updateNote(id, str, function(err, result) {
		if (result._id) {
			res.redirect('/');
		}
	});
});

module.exports = router;