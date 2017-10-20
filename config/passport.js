//passport config for Oauth

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/model');
var configAuth = require('./auth');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.clientID,
    consumerSecret: configAuth.twitterAuth.clientSecret,
    callbackURL: configAuth.twitterAuth.callbackURI
  },
  function (token, tokenSecret, profile, done) {
    User.findOne({ 'twitter.id': profile.id }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, user);
      } else {
        var newUser = new User();
        
        newUser.twitter.id = profile.id;
        newUser.displayName = profile.displayName;
        newUser.options = [];
        newUser.votes = [];

        newUser.save(function (err) {
          if (err) {
            throw err;
          }

          return done(null, newUser);
        });
      }
    });
  }));
};
