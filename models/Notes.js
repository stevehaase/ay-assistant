var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');


var noteSchema = new mongoose.Schema({
  noteContent: String,
  authorId: mongoose.Schema.ObjectId,  
  authorName: String,
  attachments: Buffer,
  date: Date,
  noteTitle: String,
});


module.exports = mongoose.model('Notes', noteSchema);
