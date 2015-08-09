var User = require('../models/User');

exports.getNotes = function(req, res) {
	if (!req.user) return res.redirect('/login');
	var allNotes = [];
	req.user.notes.sort(function(a,b){
		return b.date - a.date;
	});
	allNotes = req.user.notes;
	res.render('notes/notes', {
	  title: 'Notes',
	  notes: allNotes
	});
};

exports.getOneNote = function(req, res) {
	if (!req.user) return res.redirect('/login');
	var place = req.params.id;
	var allNotes = [];
	req.user.notes.sort(function(a,b){
		return b.date - a.date;
	});
	allNotes = req.user.notes;
	var myNote = allNotes[place];
	myNote.num = place;
	res.render('notes/oneNote', {
	  title: myNote.title,
	  note: myNote
	});
};

exports.editNote = function(req, res, next){
	var place = req.params.id;
	var allNotes = [];
	req.user.notes.sort(function(a,b){
		return b.date - a.date;
	});
	allNotes = req.user.notes;
	var myNote = allNotes[place];
	myNote.num = place;
	res.render('notes/editNote', {
	  title: "Edit" + myNote.title,
	  note: myNote
	});	
}

exports.deleteNote = function(req, res, next){
	User.findById(req.user.id, function(err, user){
		if (err) return next(err);
		user.notes.sort(function(a,b){
			return b.date - a.date;
		});
		var place = req.params.id;
		user.notes.splice(place, 1);
		user.save(function(err){
			if (err) return next(err);
			req.flash('success', {msg: 'Note has been deleted'});
			res.redirect('/notes');
		})
	})	
}

exports.saveNote = function(req, res, next){
	var note = {};
	User.findById(req.user.id, function(err, user){
		if (err) return next(err);
		user.notes.sort(function(a,b){
			return b.date - a.date;
		});
		note.title = req.body.noteTitle || "Untitled";
		note.note = req.body.note;
		var place = req.params.id;
		note.date = user.notes[place].date || new Date();
		user.notes.splice(place, 1, note);
		user.save(function(err){
			if (err) return next(err);
			res.redirect('/notes/'+place);
		})

	})
}

exports.postNote = function(req, res, next){
	var note = {}
	User.findById(req.user.id, function(err, user){
		if (err) return next(err);
		note.title = req.body.noteTitle || "Untitled";
		note.date = new Date();
		note.note = req.body.note
		user.notes.push(note);
		user.save(function(err){
			if (err) return next(err);
			req.flash('success', {msg: 'Your note has been saved'});
			res.redirect('/notes');
		})

	})
}