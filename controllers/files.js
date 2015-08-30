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
	var savedFile;
	var writestream = gfs.createWriteStream({
    	filename: req.files.myFile.name
  	})
  	fs.createReadStream(req.files.myFile.path).pipe(writestream);
  	writestream.on('close', function(file){
    	console.log(file.filename + " written to DB. Id: " + file._id)
    	savedFile = file._id;
    	req.flash('success', {msg: 'Your attachment has been saved at ' + secrets.host + '/attachments/' + savedFile});
    	//todo: set Heroku env variable.
		res.redirect('/notes');
  	})	
}

exports.downloadFile = function(req, res, next){
	console.log('starting read');
	var gfs = Grid(conn.db);
	var options = {
		_id: req.params.id
	}
	//todo: add file extension to end of .mov files
	var readstream = gfs.createReadStream(options)
	readstream.pipe(res);
}

conn.on('error', function(err) {
  console.error(err);
});
