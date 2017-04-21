var mongoose = require('./usermongoose.js')
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	username: {
		type: String,
		index: true
	}, //用户账号
	userpass: {
		type: String
	}, //密码
	userage: {
		type: Number,
		default: 23
	}, //年龄
	loginte: {
		type: Date,
		default: Date.now
	} //最近登录时间
});
module.exports = mongoose.model('User', UserSchema);