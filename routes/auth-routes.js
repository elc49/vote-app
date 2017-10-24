//Authentication route handler

var router = require('express').Router();

//login route
router.get('/login', function (req, res) {
  res.send('Login route');
});

//logout handler
router.get('/logout', function (req, res) {
  res.send('Logout route');
});

//Twitter auth route
router.get('/twitter');

//twitter callback route handler
router.get('/twitter/callback');


module.exports = router;