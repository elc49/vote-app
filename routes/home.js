var Vote = require(process.cwd() + '/models/votes');
var router = require('express').Router();

//home Route definition
router.get('/', function (req, res) {
  Vote.find({}, { __v: 0 }, function (err, docs) {
    if (err) {
      throw err;
    }

    //console.log(docs);
    res.render('polls', {
      user: req.user,
      data: docs
    });
  });
});

//vote ite route handler
router.get('/:id', function (req, res) {

  res.send('Vote Item route handler');
});

module.exports = router;