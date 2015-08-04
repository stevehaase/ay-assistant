/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  if (req.user){
  	var recentNotes = [];
  	req.user.notes.sort(function(a,b){
  		return b.date - a.date;
	});
	recentNotes = req.user.notes.slice(0,5);
  	res.render('home', {
	    title: 'Yoga Teacher Assistant',
	    todos: req.user.todo,
	    completeTodos: req.user.completedTodo,
	    notes: recentNotes
	});
  } else {
  	res.render('home', {
	    title: 'Yoga Teacher Assistant'
	});
  } 
};