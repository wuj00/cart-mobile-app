var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId


var reviewSchema = Schema({
  _reviewer: {type: ObjectId, ref: "User"},
  _reviewed: {type: ObjectId, ref: "User"},
  starRating: {type: Number, required: true, capped:{max: 5}},
  description: String
})


var Review = mongoose.model('Review', reviewSchema)

module.exports = Review
