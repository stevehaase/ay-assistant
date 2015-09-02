var User = require('../models/User');
var Note = require('../models/Notes');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require('fs');
var secrets = require('../config/secrets')


Grid.mongo = mongoose.mongo;
var conn = mongoose.connection;

exports.uploadFile = function(req, res, next){
	console.log('starting pipe');
	var gfs = Grid(conn.db);
	var savedFile, extension, note = {};
	var writestream = gfs.createWriteStream({
    	filename: req.files.myFile.name
  	})
  	fs.createReadStream(req.files.myFile.path).pipe(writestream);
  	writestream.on('close', function(file){
    	console.log(file.filename + " written to DB. Id: " + file._id)
    	savedFile = file._id;
    	//Handle any extension
    	extension = file.filename.slice(file.filename.lastIndexOf('.')+1);
    	User.findById(req.user.id, function(err, user){
			if (err) return next(err);
			note.title = req.body.noteTitle || "Untitled";
			note.date = new Date();
			note.attachment = 'https://teacher-assistant.herokuapp.com/attachments/' + savedFile + '.' + extension;
			note.note = req.body.note.replace(/(?:\r\n|\r|\n)/g, '<br/>');
			user.notes.push(note);
			user.save(function(err){
				if (err) return next(err);
			})
		})

    	req.flash('success', {msg: 'Your attachment has been saved at ' + secrets.host + '/attachments/' + savedFile + '.' + extension});
    	//todo: set Heroku env variable.
		res.redirect('/notes');
  	})	
}

exports.downloadFile = function(req, res, next){
	console.log('starting read');
	var gfs = Grid(conn.db);
	var extensionLength = req.params.id.length - req.params.id.lastIndexOf('.')
	var options = {
		_id: req.params.id.substr(0, req.params.id.length - extensionLength)
	}
	var readstream = gfs.createReadStream(options).on('error', function(e){return next(e)})
	readstream.pipe(res);
}

conn.on('error', function(err) {
  console.error(err);
});
