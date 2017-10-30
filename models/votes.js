//User votes data model Schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var votesSchema = new Schema({
  _id: String,
  created_by: String,
  time_created: { type: Date, default: Date.now },
  title: String,
  options: [String],
  votes: [String]
});

module.exports = Vote = mongoose.model('vote', votesSchema);