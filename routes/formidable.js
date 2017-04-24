var express = require('express'),
	uuidV1 = require('uuid/v1'), //防止重复
	router = express.Router(),
	formidable = require('formidable'),
	fs = require('fs'),
	TITLE = 'formidable上传文件',
	AVATAR_UPLOAD_FOLDER = '/images/avatar/';

var UserData = require('../models/userData.js');

router.get('/', function(req, res) {
	UserData.getUserByName(req.session.username, function(ere, result) {
		res.locals.headerUrl = result[0].headerurl;
		res.render('formidable', {
			title: TITLE
		});
	});
});

router.post('/', function(req, res) {
	// 创建上传表单
	var form = new formidable.IncomingForm();
	form.encoding = 'utf-8'; //设置编辑
	form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER; //设置上传目录
	form.keepExtendsions = true; //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
	// 上传
	form.parse(req, function(err, fields, files) {
		if (err) {
			res.locals.error = err;
			res.render('formidable', {
				title: TITLE
			});
			return;
		}
		var extName = ''; //后缀名
		switch (files.fulAvatar.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
		}
		if (files.fulAvatar.size > form.maxFieldsSize) {
			res.locals.error = err;
			res.render('formidable', {
				title: TITLE
			});
			return;
		}
		if (extName.length == 0) {
			res.locals.error = err;
			res.render('formidable', {
				title: TITLE
			});
			return;
		}

		var avatarName = uuidV1() + '.' + extName;
		var newPath = form.uploadDir + avatarName;

		fs.renameSync(files.fulAvatar.path, newPath); //重命名
		// console.log(newPath);public/images/avatar/71f55f70-288f-11e7-b4e1-476830ba506d.jpg
		var headerUrl = newPath.substr(6);
		UserData.updateHeaderUrl(req.session.username, headerUrl, function(err, result) {
			if (result.ok) {
				res.locals.headerUrl = headerUrl;
				res.locals.success = '上传成功';
				res.locals.success2 = '修改头像成功！！！！！！';
				res.render('formidable', {
					title: TITLE
				});
				return;
			}
			res.locals.error = "修改头像失败！！！！！！";
			res.render('formidable', {
				title: TITLE
			});
		});
	});
});

module.exports = router;