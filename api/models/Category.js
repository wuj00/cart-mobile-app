var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

var category_schema = Schema({
  name: {type: String, required: true},
  products: [{type: ObjectId, ref: "Products"}],
  sub_categories: [{type: ObjectId, ref: "Category"}]
})

var Category = mongoose.model('Category', category_schema)
module.exports = Category
