var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId
  User = require('./User.js'),
  Product = require('./Product.js')

var comment_schema = Schema({
  _creator: {type: ObjectId, ref: "User"},
  description: {type: String, required: true},
  date_posted: {type: Date, default: Date.now},
  product_commented_on: {type: ObjectId, ref: "Product"}
})

// when creating a new comment
comment_schema.post('save', function(comment){
  User.findById(comment._creator).exec(function(err, user){
    if (user.comments_posted.indexOf(comment._id) === -1){
      user.comments_posted.push(comment._id)
      user.save()
    }
  })
  Product.findById(comment.product_commented_on).exec(function(err, product){
    if (product.comments.indexOf(comment._id) === -1){
      product.comments.push(comment._id)
      product.save()
    }
  })
})

// when deleting a comment
comment_schema.post('remove', function(comment){
  User.findById(comment._creator).exec(function(err, user){
    if (user){
      user.comments_posted.splice(user.comments_posted.indexOf(comment._id), 1)
      user.save()
    }
  })
  Product.findById(comment.product_commented_on).exec(function(err, product){
    product.comments.splice(product.comments.indexOf(comment._id), 1)
    product.save()
  })
})

var Comment = mongoose.model('Comment', comment_schema)
module.exports = Comment
