var User = require('../models/User');

exports.postNote = function(req, res, next){
	User.findById(req.user.id, function(err, user){
		if (err) return next(err);
		user.notes.push(req.body.note);
		user.save(function(err){
			if (err) return next(err);
			res.redirect('/');
		})

	})
}