/**
 * GET /
 * Home page.
 */
var todoScript = require('../controllers/todo.js')

exports.index = function(req, res) {
  if (req.user){
  	res.render('home', {
	    title: 'Yoga Teacher Assistant',
	    todos: req.user.todo,
	    script: todoScript.completeTodo
	});
  } else {
  	res.render('home', {
	    title: 'Yoga Teacher Assistant',
	    script: todoScript.completeTodo
	});
  } 
};