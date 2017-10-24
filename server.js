//Import necessary modules for our server

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
//var passport = require('passport');


//Instantiate express object
var app = express();

//View Middleware
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');

//Passport Init modules
//app.use(passport.initialize());
//app.use(passport.session());

//Route Middleware
//app.use('/polls', routes);


//dontenv init
require('dotenv').config();



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
}, function () {
  console.log('Coonection to db successfull!');
});

//mongoose deprecated promise Middleware
mongoose.Promise = global.Promise;

//Server init
app.listen(8080, function () {
  console.log('Listening on port 8080');
});