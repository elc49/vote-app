//Import necessary modules for our server

var express =require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');

//connection to database
mongoose.connect('mongodb://127.0.0.1:27017/votes', { useMongoClient: true });


//Instantiate express object
var app = express();

//Route Middleware
routes(app);

//View Middleware
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');


//Static files Middleware
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/config', express.static(process.cwd() + '/config'));
app.use('/controllers', express.static(process.cwd() + '/controllers'));
app.use('/semantic', express.static(process.cwd() + '/semantic'));

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Server init
var port = 8080;
app.listen(port, function () {
  console.log('Server running on port ' + port + '!');
});
