var User = require('../models/User');

exports.postTodo = function(req, res, next){
	User.findById(req.user.id, function(err, user) {
		if (err) return next(err);
		user.todo.unshift(req.body.todo);
		console.log(user);
		user.save(function(err){
			if (err) return next(err);
			res.redirect('/');
			res.render('home.jade', {todos: user.todo});
		})
	});
};

exports.completeTodo = function(req, res, next){
	User.findById(req.user.id, function(err, user){
		if (err) return next(err)
		var num = req.body.item;
		var thingDone = user.todo[num];
		user.completedTodo.unshift(thingDone);
		user.todo.splice(num, 1);
		user.save(function(err){
			if (err) return next(err);
			res.render('home.jade', {todos: user.todo});
		})
		
	})

}
