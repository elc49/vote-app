var router = require('express').Router();
var decoder = require(process.cwd() + '/controllers/serverHandler');
var User = require(process.cwd() + '/models/model');

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
  //console.log(req.user);

});

//new poll route handler
router.get('/newPoll', ensureAuthenticated, function(req, res) {

  res.render('newPoll', {
    user: req.user,

  });

});

//new poll post route handler
router.post('/newPoll', ensureAuthenticated, function (req, res) {

  User.findOneAndUpdate({ '_id': req.user._id }, {'options': req.body.options , 'title': req.body.title }).exec(function (err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
    });


  res.redirect('/');
});

//my polls route handler
router.get('/myPoll', ensureAuthenticated, function(req, res) {

  res.render('myPoll', {
    user: req.user,

  });

});


module.exports = router;
