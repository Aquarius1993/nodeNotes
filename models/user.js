var mongodb = require('mongodb').MongoClient;
var db_name = 'mongodb://localhost:27017/sampleEjs';
var collection;
mongodb.connect(db_name, function(err, db) {
	if (err) {
		return console.log('数据库连接失败');
	}
	collection = db.collection('userinfo');
	console.log('数据库连接成功');
});

function User(user) {
	this.username = user.username;
	this.userpass = user.userpass;
};

// 保存数据
User.prototype.saveData = function(callback) {
	var user = {
		'username': this.username,
		'userpass': this.userpass
	}
	collection.insert(user, function(err, result) {
		if (err) {
			console.log('保存用户失败');
		}
		callback(err, result);
	});
}

// 根据用户名得到用户数量
User.getUserNumByName = function(name, callback) {
	var findData = {
		'username': name
	}
	collection.find(findData).count(function(err, result) {
		if (err) {
			console.log('得到用户数量失败');
		}
		callback(err, result);
	});
}

// 根据用户名得到用户信息
User.getUserByName = function(name, callback) {
	var findData = {
		'username': name
	}
	collection.find(findData).toArray(function(err, result) {
		if (err) {
			console.log('得到用户信息失败');
		}
		callback(err, result);
	});
}
module.exports = User;