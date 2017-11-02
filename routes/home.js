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
        res.redirect('/polls/myPoll/' + item_id);

      });

    });
  } else {

    Vote.where({ '_id': req.params.id }).findOne(function (err, doc) {
      
      item_id = req.params.id;

      if (err) {
        throw err;
      }

      if (typeof doc.ip_address != "undefined" || doc.ip_address.length > 0) {
        if (doc.ip_address.indexOf(req.headers['x-forwarded-for']) > -1) {
          res.redirect('/');
        } else {
          Vote.where({ '_id': req.params.id }).findOneAndUpdate({ $push: { 'votes': req.body.voteOption, 'ip_address': req.headers['x-forwarded-for'] } }, function (err, doc) {
            if (err) {
              throw err;
            }
            //console.log(doc);
            res.redirect('/' + item_id);
          });
        }
      }
    });
  }

});

module.exports = router;