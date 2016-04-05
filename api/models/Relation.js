var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId


var relation_schema = Schema({
  _follower: {type: ObjectId, ref: "User"},
  _followed: {type: ObjectId, ref: "User"}
})

var Relation = mongoose.model('Relation', relation_schema)

module.exports = Relation
