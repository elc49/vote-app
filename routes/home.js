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
      data: docs
    });
  });
});

//vote item route handler
var item_id;

router.get('/:id', function (req, res) {

  item_id = req.params.id;

  Vote.findById({ '_id': req.params.id }, function (err, docs) {
    if (err) {
      throw err;
    }

    res.render('pollItem', {
      data: docs
    });
  });

  //console.log(item_id);
});

//vote item post handler
router.post('/:id', function (req, res) {

  if (req.body.addOption) {
    Vote.where({ '_id': req.params.id }).findOneAndUpdate({ $push: {'votes': req.body.addOption, 'options': req.body.addOption } }).then(function () {
      Vote.findById({ '_id': req.params.id }, function (err, doc) {
        if (err) { 
          throw err;
        }

        //console.log(doc);
        res.redirect('/polls/pollItem' + item_id);

      });

    });
  } else {
    Vote.where({ '_id': req.params.id }).update({ $push: { 'votes': req.body.voteOption } }).then(function () {
      Vote.findById({ '_id': req.params.id }, function (err, doc) {
        if (err) {
          throw err;
        }
  
        //console.log(doc);
        res.redirect('/' + item_id);

      });
    });
  }

});

module.exports = router;