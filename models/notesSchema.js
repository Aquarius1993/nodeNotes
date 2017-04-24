var mongoose = require('./usermongoose.js');
var Schema = mongoose.Schema;
var getTime = require('./getDate.js');

var NotesData = new Schema({
	username: {
		type: String,
		index: true
	}, //用户账号
	title: {
		type: String
	},
	cotent: {
		type: String
	},
	addData: {
		type: String,
		default: getTime
	}
});
module.exports = mongoose.model('Notes', NotesData);