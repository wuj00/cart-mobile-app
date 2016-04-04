var
  mongoose = require('mongoose'),
  Schema = mongose.Schema,
  ObjectId = Schema.Types.ObjectId,
  // bcrypt = require('bcrypt-nodejs')

var user_schema = Schema({
  name: String,
  email: {type: String, unique: true, required: true}
  username: {type: String, unique: true, required: true },
  password: {type: String, required: true},
  picture: String,
  description: String
})


var User = mongoose.model('User', user_schema)


module.exports = User
