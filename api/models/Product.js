var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  User = require('./User.js'),
  Category = require('./Category.js')

var product_schema = Schema({
  name: {type: String, required: true},
  _creator: {type: ObjectId, ref: "User"},
  date_posted: {type: Date, default: Date.now},
  category: {type: ObjectId, ref: "Category"},
  description: String,
  photos: [String],
  likes: [{type: ObjectId, ref: "Like"}],
  re_posts: [{type: ObjectId, ref: "User"}],
  comments: [{type: ObjectId, ref: "Comment"}],
  price: String,
  quantity: Number
})

// when creating a new product
product_schema.post('save', function(product){
  User.findById(product._creator).exec(function(err, user){
    if (user.products.indexOf(product._id) === -1){
      user.products.push(product._id)
      user.save()
    }
  })
  Category.findById(product.category).exec(function(err, category){
    if (category.products.indexOf(product._id) === -1){
      category.products.push(product._id)
      category.save()
    }
  })
})

// when deleting a product
product_schema.post('remove', function(product){
  User.findById(product._creator).exec(function(err, user){
    if (user){
      user.products.splice(user.products.indexOf(product._id), 1)
      user.save()
    }
  })
  Category.findById(product.category).exec(function(err, category){
    category.products.splice(category.products.indexOf(product._id), 1)
    category.save()
  })
})

// when changing the category of a product
product_schema.pre('save', function(next){
  var productToUpdate = this
  if (productToUpdate.category){
    console.log(productToUpdate, '====== product')
    Category.find({}).exec(function(err, categories){
      categories.forEach(function(category){
        console.log(productToUpdate.category, 'this is <<<<<<<')
        category.products.forEach(function(product){
          if ((category._id.toString() !== productToUpdate.category.toString()) && (productToUpdate._id.toString() === product.toString())) {
            if (category.products.indexOf(product) !== -1){
              category.products.splice(category.products.indexOf(product), 1)
              category.save()
              console.log('Updated!')
            }
          }
        })
      })
      next()
    })
  } else {
    next()
  }
})

var Product = mongoose.model('Product', product_schema)
module.exports = Product
