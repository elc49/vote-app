//Authentication setup

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require(process.cwd() + '/models/users');

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
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK_URI

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
          newUser.displayName = profile.displayName;
          newUser.img.data = profile.photos[0].value;
          newUser.img.contentType = 'jgp';

          newUser.save(function (err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  })
);

