var Notes = require('./notesSchema.js');

var NoteData = function(note) {
	this.title = note.title;
	this.cotent = note.cotent;
	this.username = note.username;
}

NoteData.prototype.saveNote = function(callback) {
	var user = new Notes({
		username: this.username, //用户账号
		title: this.title,
		cotent: this.cotent
	});
	user.save(function(err, res) {
		if (err) {
			console.log('笔记添加失败！');
			return;
		}
		callback(err, res);
	});

}
NoteData.findNotes = function(name, callback) {
	var wherestr = {
		'username': name
	}
	Notes.find(wherestr, function(err, res) {
		if (err) {
			console.log('笔记获取失败！');
			return;
		}
		callback(err, res);
	})
}
NoteData.findNotesById = function(id, callback) {
	Notes.findById(id, function(err, res) {
		if (err) {
			console.log('笔记获取失败！');
			return;
		}
		callback(err, res);
	});
}
NoteData.delNote = function(id, callback) {
	var wherestr = {
		'_id': id
	};
	Notes.remove(wherestr, function(err, res) {
		if (err) {
			console.log('笔记删除失败！');
			return;
		}
		callback(err, res);
	});
}

NoteData.updateNote = function(id, updatestr, callback) {
	Notes.findByIdAndUpdate(id, updatestr, function(err, res) {
		if (err) {
			console.log(err);
			console.log('笔记修改失败！');
			return;
		}
		callback(err, res);
	})
}



module.exports = NoteData;