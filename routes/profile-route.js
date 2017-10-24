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


  var base64 = exports; 
  base64.encode = function (unencoded) {
    return new Buffer(unencoded || '').toString('base64');
  };

  base64.decode = function (encoded) {
    return new Buffer(encoded || '', base64).toString('utf8');
  };

  console.log(base64.decode(req.user.img.data));

  res.render('profile', { user: req.user, img: base64.decode(req.user.img.data) });

});

module.exports = router;