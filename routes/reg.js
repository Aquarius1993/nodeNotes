var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    UserData = require('../models/userData.js'),
    crypto = require('crypto'),
    TITLE_REG = '注册';

router.get('/', function(req, res) {
    res.render('reg', {
        title: TITLE_REG
    });
});


router.post('/', function(req, res) {
    var userName = req.body.txtUserName,
        userPwd = req.body.txtUserPwd,
        userRePwd = req.body.txtUserRePwd,
        md5 = crypto.createHash('md5');
    userPwd = md5.update(userPwd).digest('hex');

    var newUser = new UserData({
        username: userName,
        userpass: userPwd
    });

    // 检查用户是否已经存在
    UserData.getUserNumByName(newUser.username, function(err, result) {
        console.log(result);
        if (result > 0) {
            err = '用户名已存在';
        }
        if (err) {
            res.locals.error = err;
            res.render('reg', {
                title: TITLE_REG
            });
            return;
        }
        // 不存在就添加
        newUser.saveData(function(err, result) {
            console.log(result);
            if (err) {
                res.locals.error = err;
                res.render('reg', {
                    title: TITLE_REG
                });
                return;
            }
            if (result.username = newUser.username) {
                res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>';
            } else {
                res.locals.error = err;
            }
            res.render('reg', {
                title: TITLE_REG
            });
        });
    });
});

module.exports = router;