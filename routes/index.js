var router = require('express').Router();
var decoder = require(process.cwd() + '/controllers/serverHandler');
var User = require(process.cwd() + '/models/users');
var Vote = require(process.cwd() + '/models/votes');
var uuid = require('uuid/v4');

var base64 = new decoder();

//ensure user isAuthenticated() Middleware
function ensureAuthenticated(req, res, next) {

  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {

    next();
  }
}
/*
//home route
router.get('/', function(req, res) {

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

//home route vote item view route handler
router.get('/:id', function (req, res) {
  res.send('Vote Item view');
});
*/
//new poll route handler
router.get('/newPoll', ensureAuthenticated, function(req, res) {

  res.render('newPoll', {
    user: req.user,

  });

});

//new poll post route handler
router.post('/newPoll', ensureAuthenticated, function (req, res) {

  var newVote = new Vote({
    _id: uuid(),
    created_by: req.user.username,
    title: req.body.title,
    options: req.body.options.split(','),
    votes: req.body.options.split(',')

  });

  newVote.save(function (err) {
    if (err) {
      throw err;
    }
    //console.log(newVote);
    res.redirect('/polls/myPoll');

  });

});

//my polls route handler
router.get('/myPoll', ensureAuthenticated, function(req, res) {

  Vote.find({'created_by': req.user.username }, function (err, docs) {
    if (err) {
      throw err;
    }

    //console.log(docs);
    res.render('myPoll', {
      user: req.user,
      data: docs
  
    });
  });

  //console.log(req.user);

});

var item_id;

//Poll item route handler
router.get('/myPoll/:id', ensureAuthenticated, function (req, res) {

  Vote.findById({ '_id': req.params.id }, function (err, docs) {
    if (err) {
      throw err;
    }

    //console.log(docs);    
    res.render('pollItem', {
      user: req.user,
      data: docs
    });
    
  });
});

//Vote option route handler
router.post('/myPoll/:id', ensureAuthenticated, function (req, res) {

  item_id = req.params.id;
  
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

    Vote.where({ '_id': req.params.id }).findOneAndUpdate({ $push: { 'votes': req.body.voteOption } }).then(function () {
      Vote.findById({ '_id': req.params.id }, function (err, doc) {
        if (err) {
          throw err;
        }
  
        //console.log(doc);
        res.redirect('/polls/myPoll/' + item_id);
      });
    });
  }

});


module.exports = router;
