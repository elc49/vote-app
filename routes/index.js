var router = require('express').Router();
var decoder = require(process.cwd() + '/controllers/serverHandler');
//var ensureAuthenticated = require(process.cwd() + '/controllers/serverHandler');

var base64 = new decoder();

//ensure user isAuthenticated() Middleware
function ensureAuthenticated(req, res, next) {

  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {

    next();
  }
}

//home route
router.get('/', function(req, res) {

  res.render('polls', {
    user: req.user,

  });

});

//new poll route handler
router.get('/newPoll', ensureAuthenticated, function(req, res) {

  res.render('newPoll', {
    user: req.user,

  });

});

//new poll post route handler
router.post('/newPoll', function (req, res) {

  var vote = {
    title: req.body.title,
    options: req.body.options
  };

  console.log(vote);

  res.redirect('/');
});

//my polls route handler
router.get('/myPoll', ensureAuthenticated, function(req, res) {

  res.render('myPoll', {
    user: req.user,

  });

});


module.exports = router;
