//Import necessary modules for our server

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require(process.cwd() + '/routes/index');
var auth = require(process.cwd() + '/routes/auth-routes');
var passportSetup = require(process.cwd() + '/config/passport');
var passport = require('passport');
var session = require('cookie-session');

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

//Passport Init modules
app.use(passport.initialize());
app.use(passport.session());

//Route Middleware
app.use('/', routes);
app.use('/polls', routes);
app.use('/auth', auth);


//Static files Middleware
app.use('/controllers', express.static(process.cwd() + '/controllers'));


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
