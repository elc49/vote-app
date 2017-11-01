//Import necessary modules for our server

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require(process.cwd() + '/routes/index');
var home = require(process.cwd() + '/routes/home');
var auth = require(process.cwd() + '/routes/auth-routes');
var passportSetup = require(process.cwd() + '/config/passport');
var passport = require('passport');
var session = require('cookie-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');

//Instantiate express object
var app = express();

//dontenv init
require('dotenv').config();

//session Middleware
app.use(session({
  keys: ['3dw1nM0535'],
  maxAge: 24 * 60 * 60 * 100
}));


//View Middleware
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.text());

//Passport Init modules
app.use(passport.initialize());
app.use(passport.session());

//Static files Middleware
app.use('/controllers', express.static(process.cwd() + '/controllers'));
app.use('/assets', express.static(process.cwd() + '/assets'));

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//Connect flash Middleware
app.use(flash());

//Global var config for connect-flash
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Route Middleware
app.use('/', home);
app.use('/polls', routes);
app.use('/auth', auth);

//connection to database
mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
}, function () {
  console.log('Connection to db successfull!');
});

//mongoose deprecated promise Middleware
mongoose.Promise = global.Promise;

//Server init
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Listening on port 8080');
});
