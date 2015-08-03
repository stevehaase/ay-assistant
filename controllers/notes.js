var User = require('../models/User');

exports.postNote = function(req, res, next){
	var note = {}
	console.log(req.body);
	User.findById(req.user.id, function(err, user){
		if (err) return next(err);
		note.title = req.body.noteTitle || "Untitled";
		note.date = new Date();
		note.note = req.body.note
		user.notes.push(note);
		user.save(function(err){
			if (err) return next(err);
			res.redirect('/');
		})

	})
}