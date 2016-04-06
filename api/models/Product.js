var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId,
  User = require('./User.js'),
  Catagory = require('./Catergory.js')

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

// when creating a new product
product_schema.post('save', function(product){
  User.findById(product._creator).exec(function(err, user){
    if (user.products.indexOf(product._id) === -1){
      user.products.push(product._id)
      user.save()
    }
  })
  Catagory.findById(product.catagory).exec(function(err, catagory){
    if (catagory.products.indexOf(product._id) === -1){
      catagory.products.push(product._id)
      catagory.save()
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
  Catagory.findById(product.catagory).exec(function(err, catagory){
    catagory.products.splice(catagory.products.indexOf(product._id), 1)
    catagory.save()
  })
})

// when changing the catagory of a product
product_schema.pre('save', function(next){
  var productToUpdate = this
  if (productToUpdate.catagory){
    console.log(productToUpdate, '====== product')
    Catagory.find({}).exec(function(err, catagories){
      catagories.forEach(function(catagory){
        console.log(productToUpdate.catagory, 'this is <<<<<<<')
        catagory.products.forEach(function(product){
          if ((catagory._id.toString() !== productToUpdate.catagory.toString()) && (productToUpdate._id.toString() === product.toString())) {
            if (catagory.products.indexOf(product) !== -1){
              catagory.products.splice(catagory.products.indexOf(product), 1)
              catagory.save()
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
