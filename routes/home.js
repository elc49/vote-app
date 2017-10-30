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
var item_id;

router.get('/:id', function (req, res) {

  Vote.findById({ '_id': req.params.id }, function (err, docs) {
    if (err) {
      throw err;
    }

    res.render('pollItem', {
      user: req.user,
      data: docs
    });
  });

  //console.log(item_id);
});

module.exports = router;