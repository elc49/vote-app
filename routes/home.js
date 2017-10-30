var Vote = require(process.cwd() + '/models/votes');
var router = require('express').Router();

//home Route definition
router.get('/', function (req, res) {
  Vote.find({}, {_id: 0, __v: 0 }, function (err, docs) {
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

module.exports = router;