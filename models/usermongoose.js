var mongoose = require('mongoose'),
	DB_URL = 'mongodb://localhost:27017/nodeReatNote';
// 如果没有这个数据库则新建

// 连接
mongoose.connect(DB_URL);
// 连接成功
mongoose.connection.on('connected', function() {
	console.log('Mongoose connection open to ' + DB_URL);
});
// 连接异常
mongoose.connection.on('error', function() {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose connection disconnected');
});


module.exports = mongoose;