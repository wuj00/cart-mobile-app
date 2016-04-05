var
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    User = require('./User.js'),
    Product = require('./Product.js')

var like_schema = Schema({
        user: {type: ObjectId, ref: "User"},
        _product: {type: ObjectId, ref: "Product"}
    })

// when liking a product
like_schema.post('save', function(like){
  User.findById(like.user).exec(function(err, user){
    if (user.liked_products.indexOf(like._id) === -1){
      user.liked_products.push(like._id)
      user.save()
    }
  })
  Product.findById(like._product).exec(function(err, product){
    if (product.likes.indexOf(like._id) === -1){
      product.likes.push(like._id)
      product.save()
    }
  })
})

// when unliking a product
like_schema.post('remove', function(like){
  User.findById(like.user).exec(function(err, user){
    if (user){
      user.liked_products.splice(user.liked_products.indexOf(like._id), 1)
      user.save()
    }
  })
  Product.findById(like._product).exec(function(err, product){
    product.likes.splice(product.likes.indexOf(like._id), 1)
    product.save()
  })
})

var Like = mongoose.model('Like', like_schema)
module.exports = Like
