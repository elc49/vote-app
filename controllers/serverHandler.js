//Create various handlers for server interaction
var User = require('../models/model');

function votesHandler () {

  this.getVotes = function (req, res) {
    User.findOne({ 'twitter.id': req.user.twitter.id }, { '_id': false}).exec(function (err, data) {
      if (err) {
        throw err;
      }
      
      console.log(data);
    });
  };

  this.addVotes = function (req, res) {
    User.findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { $push: { 'votes': req.body.vote } }).exec(function (err, data) {
      if (err) {
        throw err;
      }

      console.log(data);
    });
  };

}

module.exports= votesHandler; 
