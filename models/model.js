//User data model Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema= new Schema({
  twitter: {
    id: String,
    displayName: String,
  },
  options: [String],
  votes: [String]
}); 

module.exports = mongoose.model('User', UserSchema);