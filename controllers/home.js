/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {

  res.render('home', {
    title: 'Home',
    todos: req.user.todo
  });
};