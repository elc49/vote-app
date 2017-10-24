//Authentication route handler

var router = require('express').Router();
var passport = require('passport');


//logout handler
router.get('/logout', function (req, res) {
  res.send('Logout route');
});

//Twitter auth route
router.get('/twitter', passport.authenticate('twitter'));


//twitter callback route handler
router.get('/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/'
}), function (req, res) {
  //Success authentication, redirect home
  res.redirect('/profile');
});


module.exports = router;