var
  mongoose = require('mongoose'),
  Schema = mongose.Schema,
  ObjectId = Schema.Types.ObjectId,
  // bcrypt = require('bcrypt-nodejs')

var user_schema = Schema({
  name: string,
  username: {type: String, unique: true, required: true },
  password: {type: String, required: true},
})


var User = mongoose.model('User', userSchema)


module.exports = User
