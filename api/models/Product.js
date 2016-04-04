var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

var product_schema = Schema({
  name: {type: String, required: true},
  _creator: {type: ObjectId, ref: "User"},
  date_posted: {type: Date, default: Date.now},
  catagory: {type: ObjectId, ref: "Catagory"},
  description: String,
  photos: [String],
  likes: [{type: ObjectId, ref: "Like"}],
  re_posts: [{type: ObjectId, ref: "User"}],
  comments: [{type: ObjectId, ref: "Comment"}],
  price: String,
  quantity: Number
})

var Product = mongoose.model('Product', product_schema)
module.exports = Product
