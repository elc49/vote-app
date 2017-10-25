var router = require('express').Router();
var decoder = require(process.cwd() + '/controllers/serverHandler');
//var ensureAuthenticated = require(process.cwd() + '/controllers/serverHandler');

var base64 = new decoder();

//ensure user isAuthenticated() Middleware

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

//home route handler
router.get('/', ensureAuthenticated, function (req, res) {

  res.render('polls', {
    user: req.user,
    img: base64.decode(req.user.img.data)
  });
});

//new poll route handler
router.get('/newPoll', function (req, res) {

  res.render('newPoll', {
    user: req.user,
    img: base64.decode(req.user.img.data)
  });
});

//my polls route handler
router.get('/myPoll', function (req, res) {

  res.render('myPoll', {
    user: req.user,
    img: base64.decode(req.user.img.data)
  });
});


module.exports = router;
