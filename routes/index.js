var router = require('express').Router();

//Home route handler
router.get('/', function (req, res) {
  res.send('Home route');
});

//new poll route handler
router.get('/newPoll', function (req, res) {
  res.render('newPoll');
});

//my polls route handler
router.get('/myPolls', function (req, res) {
  res.send('This is my polls route');
});


module.exports = router;