//User data model Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String
  },
  _id: String,
  username: String,
  displayName: String
}); 

module.exports = User = mongoose.model('user', UserSchema);