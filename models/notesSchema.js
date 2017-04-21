var mongoose = require('./usermongoose.js');
var Schema = mongoose.Schema;
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
		type: Date,
		default: Date.now
	}
});
module.exports = mongoose.model('Notes', NotesData);