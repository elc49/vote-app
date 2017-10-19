//Import necessary modules for our server

var express =require('express');
var bodyParser = require('body-parser');

//Instantiate express object
var app = express();

//Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Server init
app.listen(3000, function () {
  console.log('Server running on port 3000!');
});
