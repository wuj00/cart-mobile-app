var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId
  // bcrypt = require('bcrypt-nodejs')

var user_schema = Schema({
  name: String,
  email: {type: String, unique: true, required: true},
  username: {type: String, unique: true, required: true },
  password: {type: String, required: true},
  products: [{type: ObjectId, ref: "Product"}],
  comments_posted: [{type: ObjectId, ref: "Comment"}],
  liked_products: [{type: ObjectId, ref: "Like"}],
  // whos following you
  followers: [{type: ObjectId, ref: "Relation"}],
  // who you're following
  following: [{type: ObjectId, ref: "Relation"}],
  picture: String,
  description: String
})


var User = mongoose.model('User', user_schema)


module.exports = User
