var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

var comment_schema = Schema({
  _creator: {type: ObjectId, ref: "User"},
  description: {type: String, required: true},
  date_posted: {type: Date, default: Date.now},
  product_commented_on: {type: ObjectId, ref: "Product"}
})

var Comment = mongoose.model('Comment', comment_schema)
module.exports = Comment
