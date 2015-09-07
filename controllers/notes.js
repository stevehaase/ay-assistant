var User = require('../models/User');
var Note = require('../models/Notes');
var files = require('./files');

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
	  note: myNote.note,
	  attachment: myNote.attachment,
	  author: myNote.authorName,
	  date: myNote.date
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
	myNote.note = myNote.note.replace(/<br\s*[\/]?>/gi, "\n");
	myNote.num = place;
	/* 
	******
	
	TODO: Include the file attachment link here so we can save it.

	******
	*/
	res.render('notes/editNote', {
	  title: "Edit " + myNote.title,
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
		note.note = req.body.note.replace(/(?:\r\n|\r|\n)/g, '<br/>');
		var place = req.params.id;
		note.date = user.notes[place].date || new Date();
		user.notes.splice(place, 1, note);
		user.save(function(err){
			if (err) return next(err);
			req.flash('success', {msg: 'Note has been updated'});
			res.redirect('/notes');
		})

	})
}

exports.postNote = function(req, res, next){
	var note = {}
	if (req.files.myFile){
		console.log('theres a file');
		files.uploadFile(req, res, next);
	}
	else{
		User.findById(req.user.id, function(err, user){
			if (err) return next(err);
			note.title = req.body.noteTitle || "Untitled";
			note.date = new Date();
			note.note = req.body.note.replace(/(?:\r\n|\r|\n)/g, '<br/>');
			user.notes.push(note);
			user.save(function(err){
				if (err) return next(err);
				req.flash('success', {msg: 'Note has been saved'});
				res.redirect('/notes');
			})

		})
	}
}

exports.shareNote = function(req, res, next){
	var place = req.params.id;
	var allNotes = [];
	var id = 
	req.user.notes.sort(function(a,b){
		return b.date - a.date;
	});
	allNotes = req.user.notes;
	var myNote = allNotes[place];

	var note = new Note;
	note.authorId = req.user._id;
	note.authorName = req.user.profile.name;
	note.noteContent = myNote.note;
	note.noteTitle = myNote.title;
	note.date = myNote.date;
	note.attachmentLink = myNote.attachment;
	note.save(function(err){
		if (err) next(err);
		res.redirect('/notes/shared/'+note._id);
	});
}

exports.publicNote = function(req, res, next){
	var noteId = req.params.publicId
	Note.findById(noteId, function(err, note){
		if (err) return next(err);
		res.render('notes/publicNote', {
		  title: note.noteTitle,
		  note: note.noteContent,
		  attachment: note.attachmentLink,
		  author: note.authorName,
		  id: noteId
		});
	})
}