var User = require('../models/User');

exports.postTodo = function(req, res, next){
	User.findById(req.user.id, function(err, user) {
		if (err) return next(err);
		user.todo.unshift(req.body.todo);
		console.log(user);
		user.save(function(err){
			if (err) return next(err);
			res.render('home.jade', {todos: user.todo});
		})
	});
};
