var router = require('express').Router();
var decoder = require(process.cwd() + '/controllers/serverHandler');

var base64 = new decoder();

//home route handler
router.get('/', function (req, res) {

  res.render('home', { 
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