var Product = require("../models/Product.js")

module.exports = {
  index: function(req, res){
    Product.find({}).exec(function(err, products){
      if (err) throw err
      res.json({success: true, message: "All Products", products: products})
    })
  },
  one_product: function(req, res){
    Product.findById(req.params.id).exec(function(err, product){
      if (err) throw err
      res.json({success: true, product: product})
    })
  },
  create_product: function(req, res){
    var new_product = new Product(req.body)
    new_product.save(function(err, product){
      if (err) throw err
      res.json({success: true, message: "successfully created product", product: product})
    })
  },
  edit_product: function(req, res){
    Product.findOne({_id: req.params.id}).exec(function(err, product){
      if (err) throw err
      product.description = req.body.description
      product.catagory = req.body.catagory
      product.name = req.body.name
      product.photos = req.body.photos
      product.price = req.body.price
      product.quantity = req.body.quantity
      product.save(function(err, saved_product){
        if (err) throw err
        res.json({success: true, message: "product updated", product: saved_product})
      })
    })
  },
  delete_product: function(req, res){
    Product.findOne({_id: req.params.id}).exec(function(err, product){
      if (err) throw err
      product.remove({_id: req.params.id}, function(err){
        res.json({success: true, message: "successfully deleted product"})
      })
    })
  }
}
