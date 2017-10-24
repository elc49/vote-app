//User profile route handler

var router = require('express').Router();

router.get('/', function (req, res) {
  res.render('profile');
});

module.exports = router;