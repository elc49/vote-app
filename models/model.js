//User data model Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: String,
  username: String,
  options: [String],
  votes: [String]
}); 

module.exports = User = mongoose.model('user', UserSchema);