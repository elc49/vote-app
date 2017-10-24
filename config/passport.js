//Authentication setup

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var keys = require(process.cwd() + '/config/auth');
var User = require(process.cwd() + '/models/model');

//serializeUser()/deserializeUser() user Middleware

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then(function (user) {
    done(null, user);
  });
});

//Setup passport Middleware
passport.use(
  new TwitterStrategy ({
    consumerKey: 'U9VEjGV6DhGLDzlYklvkLgE3j',
    consumerSecret: 'AVjtxIh9x0p54QdjDAIIqcm41TudkYoyqvJsOneML4MR6299JP',
    callbackURL: keys.twitter.callbackURL

  }, function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
      User.findOne({ '_id': profile.id }, function (err, user) {
        if (err) {
          throw err;
        }

        if (user) {
          return done(null, user);
        } else {

          var newUser = new User();

          newUser._id = profile.id;
          newUser.username = profile.username;
          newUser.displayName = profile._json.name;

          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            console.log(newUser);
            return done(null, newUser);
          });
        }
      });
    });
  })
);

