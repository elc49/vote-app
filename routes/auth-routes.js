//Authentication route handler

var router = require('express').Router();
var passport = require('passport');


//logout route handler
router.get('/logout', function(req, res) {

  req.logout();
  res.redirect('/');
});

//Twitter auth route handler
router.get('/twitter', passport.authenticate('twitter'));


//twitter callback route handler
router.get('/twitter/callback', passport.authenticate('twitter', {

  failureRedirect: '/'
}), function(req, res) {

  //Success authentication, redirect home
  res.redirect('/');
});


module.exports = router;
