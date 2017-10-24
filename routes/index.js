var router = require('express').Router();

//home route handler
router.get('/', function (req, res) {
  res.render('home', { user: req.user });
});

//new poll route handler
router.get('/newPoll', function (req, res) {
  res.render('newPoll', { user: req.user });
});

//my polls route handler
router.get('/myPoll', function (req, res) {
  res.render('myPoll', { user: req.user });
});


module.exports = router;