var express = require('express'),
	router = express.Router(),
	UserData = require('../models/userData.js'),
	crypto = require('crypto'),
	TITLE = '密码重置';

router.get('/', function(req, res) {
	if (req.cookies.islogin) {
		console.log('cookies:' + req.cookies.islogin);
		res.locals.username = req.cookies.islogin;
	} else if (req.session.username) {
		console.log('session:' + req.session.username);
		res.locals.username = req.session.username;
	}
	// console.log(res.locals.username);
	res.render('repass', {
		title: TITLE
	});
});

router.post('/', function(req, res) {
	var oldpass = req.body.txtUserPwd,
		newpass = req.body.txtUserNewPwd,
		username = req.session.username;
	UserData.getUserByName(username, function(err, result) {
		oldpass = crypto.createHash('md5').update(oldpass).digest('hex');
		if (result[0].userpass != oldpass) {
			res.locals.error = "原始密码输入错误！";
			res.locals.username = username;
			res.render('repass', {
				title: TITLE
			});
			return;
		}
		console.log(newpass);
		newpass = crypto.createHash('md5').update(newpass).digest('hex');
		console.log(newpass);
		UserData.updataPass(username, newpass, function(err, result) {
			console.log(result);
			if (err) {
				res.locals.error = "修改密码失败！";
				res.locals.username = username;
				res.render('repass', {
					title: TITLE
				});
				return;
			}
			if (result.ok) {
				var passinfo = "修改密码成功，请重新登录！";
				res.cookie('isrepass', passinfo, {
					maxAge: 5000
				});
				res.redirect('/login')
				return;
			}
		});
	});
});

module.exports = router;