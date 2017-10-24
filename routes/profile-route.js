//User profile route handler

var router = require('express').Router();

var validateUser = function (req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
}


router.get('/', validateUser, function (req, res) {
  res.render('profile', { user: req.user });
});

module.exports = router;