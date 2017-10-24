//Authentication setup

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var keys = require(process.cwd() + '/config/auth');
var User = require(process.cwd() + '/models/model');
var key = process.env.CONSUMER_KEY;
var secret = process.env.CONSUMER_SECRET;

//serializeUser()/deserializeUser() user Middleware
/*
passport.serializeUser(function (user, done) {
  done(null, done);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    done(null, user);
  });
});
*/
//Setup passport Middleware
passport.use(
  new TwitterStrategy ({
    consumerKey: 'U9VEjGV6DhGLDzlYklvkLgE3j',
    consumerSecret: 'AVjtxIh9x0p54QdjDAIIqcm41TudkYoyqvJsOneML4MR6299JP',
    callbackURL: keys.twitter.callbackURL

  }, function (token, tokenSecret, profile, done) {
    console.log(profile);
  })
);

