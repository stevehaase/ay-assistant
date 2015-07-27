/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user){
  	res.render('home', {
	    title: 'Yoga Teacher Assistant',
	    todos: req.user.todo
	});
  } else {
  	res.render('home', {
	    title: 'Yoga Teacher Assistant'
	});
  } 
};