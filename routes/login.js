var express = require('express'),
	router = express.Router(),
	User = require('../models/user.js'),
	UserData = require('../models/userData.js'),
	crypto = require('crypto'),
	TITLE_LOGIN = '登录';

/* GET home page. */
router.get('/', function(req, res) {
	// 记住密码登录
	if (req.cookies.islogin) {
		res.redirect('/');
		return;
	}
	if (req.cookies.isrepass) {
		res.locals.info = req.cookies.isrepass;
	}
	res.render('login', {
		title: TITLE_LOGIN
	});
});

router.post('/', function(req, res) {
	var userName = req.body.txtUserName,
		userPwd = req.body.txtUserPwd,
		isRem = req.body.chbRem,
		md5 = crypto.createHash('md5');
	UserData.getUserByName(userName, function(err, result) {
		// console.log(result);
		if (!result.length) {
			res.locals.error = '用户不存在！';
			res.render('login', {
				title: TITLE_LOGIN
			});
			return;
		}
		userPwd = md5.update(userPwd).digest('hex');
		if (result[0].userpass != userPwd) {
			res.locals.error = '密码错误！';
			res.render('login', {
				title: TITLE_LOGIN
			});
			return;
		}
		if (isRem) {
			res.cookie('islogin', userName, {
				maxAge: 60000
			});
		}
		res.locals.username = userName;
		req.session.username = res.locals.username;
		res.redirect('/');
		return;

	});
});

module.exports = router;