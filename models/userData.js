var User = require('./userSchema.js');


function UserData(user) {
	this.username = user.username;
	this.userpass = user.userpass;
}

UserData.prototype.saveData = function(callback) {
	var user = new User({
		username: this.username, //用户账号
		userpass: this.userpass, //密码
	});
	user.save(function(err, res) {
		if (err) {
			console.log('保存用户失败' + err);
			return;
		}
		callback(err, res);
	})
}

UserData.getUserNumByName = function(username, callback) {
	var wherestr = {
		username: username
	};
	User.count(wherestr, function(err, res) {
		if (err) {
			console.log('获取用户数量失败' + err);
			return;
		}
		callback(err, res);
	});
}

UserData.getUserByName = function(username, callback) {
	var wherestr = {
		username: username
	};
	User.find(wherestr, function(err, res) {
		if (err) {
			console.log('获取用户失败' + err);
			return;
		}
		callback(err, res);
	})
}

UserData.updataPass = function(username, newpass, callback) {
	var wherestr = {
		username: username
	};
	var newstr = {
		userpass: newpass
	}
	User.update(wherestr, newstr, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		callback(err, res)
			// console.log(res); //{ ok: 1, nModified: 1, n: 1 }
	});
}

module.exports = UserData;

// 插入
function insert() {
	var user = new User({
		username: 'Tracy McGrady91', //用户账号
		userpwd: 'abcd', //密码
		userage: 25, //年龄
		// logindate: new Date() //最近登录时间
	});
	user.save(function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res);
	});
}
// insert();

function update() {
	var wherestr = {
		'username': 'Tracy McGrady'
	};
	var updatestr = {
		'userpwd': 'zzzz'
	};
	User.update(wherestr, updatestr, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res); //{ ok: 1, nModified: 1, n: 1 }
	});
}
// update();

function findByIdAndUpdate() {
	var id = '58f87f1a1531560f5e876bac';
	var updatestr = {
		'userpwd': 'lhy031'
	};
	User.findByIdAndUpdate(id, updatestr, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res); //{ _id: 58f87f1a1531560f5e876bac,
		// username: 'Tracy McGrady',
		// userpwd: 'zzzz',
		// userage: 37,
		// logindate: Thu Apr 20 2017 17:27:54 GMT+0800 (CST),
		// __v: 0 }
	})
}
// findByIdAndUpdate();


function del() {
	var wherestr = {
		'username': 'Tracy McGrady4'
	};
	User.remove(wherestr, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res.result); //{ ok: 1, n: 2 }
	})
}
// del();

function getByConditions() {
	var wherestr = {
		'userage': 25
	};
	var opt = {
		"username": 1, ////1显示，0不显示，默认不显示
		"_id": 1
	};
	User.find(wherestr, opt, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res); //[ { _id: 58f88252a3d61113bdf088e4, username: 'Tracy McGrady3' },
		// { _id: 58f884b33cc4f716ebe8f8d2, username: 'Tracy McGrady9' },
		// { _id: 58f884bb1efdf216efbb0cc7, username: 'Tracy McGrady91' } ]
	});
}
// getByConditions();

function getByConditionsNums() {
	var wherestr = {
		'userage': 25
	};
	User.find(wherestr).count(function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res); //3
	})
}
// getByConditionsNums();



function getNumsByConditions() {
	var wherestr = {
		'userage': 25
	};
	User.count(wherestr, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res); //3
	})
}
// getNumsByConditions();



function getByID() {
	var id = '58f884bb1efdf216efbb0cc7';
	User.findById(id, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res); //3
	})
}
// getByID();

function getByRegex() {
	var wherestr = {
		'username': {
			$regex: /2/i
		}
	};
	User.find(wherestr, function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res); //3
	})
}
// getByRegex();


// 分页查询
function getByPage() {
	var pageSize = 3; //一页多少条
	var currentPage = 4; //当前第几页
	var sort = {
		'logindate': -1
	}; //排序（按登录时间倒序）
	var condition = {}; //条件
	var skipnum = (currentPage - 1) * pageSize; //跳过数
	User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function(err, res) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res); //3
	})
}
// getByPage();