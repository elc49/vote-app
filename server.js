//Import necessary modules for our server

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var passport = require('passport');
var session = require('express-session');


//Instantiate express object
var app = express();

//View Middleware
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');

//Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

//Passport Init modules
app.use(passport.initialize());
app.use(passport.session());

//Route Middleware
routes(app, passport);
require('dotenv').load();
require('./config/passport')(passport);



//Static files Middleware
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/config', express.static(process.cwd() + '/config'));
app.use('/controllers', express.static(process.cwd() + '/controllers'));
app.use('/semantic', express.static(process.cwd() + '/semantic'));

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//connection to database
mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
});

//mongoose deprecated promise Middleware
mongoose.Promise = global.Promise;

//Server init
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running on port ' + port + '!');
});
