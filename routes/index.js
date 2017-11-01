var router = require('express').Router();
var decoder = require(process.cwd() + '/controllers/serverHandler');
var User = require(process.cwd() + '/models/users');
var Vote = require(process.cwd() + '/models/votes');
var uuid = require('uuid/v4');

var base64 = new decoder();

//ensure user isAuthenticated() Middleware
function ensureAuthenticated(req, res, next) {

  if (!req.isAuthenticated()) {
    req.flash('error_msg', 'You must be logged in to access app functionality as a user!');
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

  res.render('newPoll');

});

//new poll post route handler
router.post('/newPoll', ensureAuthenticated, function (req, res) {

  var created_by = req.user.username;
  var title = req.body.title;
  var options = req.body.options.split(',');
  var votes = req.body.options.split(',');

  //Validation
  req.checkBody('title', 'Vote title should not be Empty').notEmpty();
  req.checkBody('options', 'Vote options should not be empty').notEmpty();

  var error = req.validationErrors();

  if (error) {

    //console.log(error);
    res.render('newPoll', {
      error: error,
    });

  } else {

    var newVote = new Vote({
      _id: uuid(),
      created_by: created_by,
      title: title,
      options: options,
      votes: votes
  
    });

    newVote.save(function (err) {
      if (err) {
        throw err;
      }
      //console.log(newVote);
    });

    res.redirect('/');
  }

});

//my polls route handler
router.get('/myPoll', ensureAuthenticated, function(req, res) {

  Vote.find({'created_by': req.user.username }, function (err, docs) {
    if (err) {
      throw err;
    }

    //console.log(docs);
    res.render('myPoll', {
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

    Vote.where({ '_id': req.params.id }).findOne(function (err, doc) {
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
            res.redirect('/polls/myPoll/' + item_id);
          });
        }
      }
    });
  }

});

//vote item delete route handler
router.get('/myPoll/delete/:id', ensureAuthenticated, function (req, res) {

  Vote.deleteOne({ '_id': req.params.id, 'created_by': req.user.username}, function (err, doc) {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});


module.exports = router;
