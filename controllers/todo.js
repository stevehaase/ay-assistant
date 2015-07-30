var User = require('../models/User');

exports.postTodo = function(req, res, next){
	User.findById(req.user.id, function(err, user) {
		if (err) return next(err);
		if (req.body.todo){
			user.todo.unshift(req.body.todo);	
			user.save(function(err){
				if (err) return next(err);
				res.redirect('/');
			})
		}
		
	});
};

exports.completeTodo = function(req, res, next){
	User.findById(req.user.id, function(err, user){
		if (err) return next(err)
		var num = req.body.item;
		var thingDone = user.todo[num];
		if (thingDone){
			user.completedTodo.unshift(thingDone);
			user.todo.splice(num, 1);	
			user.save(function(err){
				if (err) return next(err);
				res.redirect('/');
			})
		}
		
		
	})

}
