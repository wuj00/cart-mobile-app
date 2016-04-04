var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId

var catagory_schema = Schema({
  name: {type: String, required: true},
  products: [{type: ObjectId, ref: "Products"}],
  sub_catagories: [{type: ObjectId, ref: "Catagory"}]
})

var Catagory = mongoose.model('Catagory', catagory_schema)
module.exports = Catagory
