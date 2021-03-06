var User = require('../models/User');

exports.getTodos = function(req, res, next){
	if (!req.user) return res.redirect('/login');
	res.render('todos/todos', {
	    title: 'ToDos',
	    todos: req.user.todo,
	    completeTodos: req.user.completedTodo
	});
}

exports.postTodo = function(req, res, next){
	User.findById(req.user.id, function(err, user) {
		if (err) return next(err);
		if (req.body.todo){
			user.todo.unshift(req.body.todo);	
			user.save(function(err){
				if (err) return next(err);
				res.redirect('/')
			})
		}
		
	});
};

exports.postToDoFocus = function(req, res, next){
	User.findById(req.user.id, function(err, user) {
		if (err) return next(err);
		if (req.body.todo){
			user.todo.unshift(req.body.todo);	
			user.save(function(err){
				if (err) return next(err);
				res.redirect('/todos')
			})
		}
		
	});	
}

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

