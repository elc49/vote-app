//Routes handler

var votesHandler = require('../controllers/serverHandler');

module.exports = function (app, passport) {

  function IsLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  var voteHandler = new votesHandler();
  
  //Home route if req.isAuthenticated()
  app.route('/').get(function (req, res) {
    res.render('index', { user: req.user });
  });

  //Login route if !req.isAuthenticated()
  app.route('/login').get(function (req, res) {
    res.render('/login', voteHandler.getVotes);
  });

  //Logout route handler
  app.route('/logout').get(function (req, res) {
    req.logout();
    res.redirect('/');
  });

  //Profile route handler
  app.route('/profile').get(IsLoggedIn, function (req, res) {
    res.render('profile');
  });

  //Authenticate route
  app.route('/auth/twitter').get(passport.authenticate('twitter'));

  //Callback route if auth === true
  app.route('/auth/twitter/callback').get(passport.authenticate('twitter', { 
    successRedirect: '/',
    failureRedirect: '/login'
   }));

  //New vote route
  app.route('/polls/newvote').get(function (req, res) {
    res.render('form');
  });
};