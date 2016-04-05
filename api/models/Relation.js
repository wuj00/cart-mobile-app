var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId


var relation_schema = Schema({
  // current user
  _follower: {type: ObjectId, ref: "User"},
  // other user
  _followed: {type: ObjectId, ref: "User"}
})

var Relation = mongoose.model('Relation', relation_schema)

module.exports = Relation
