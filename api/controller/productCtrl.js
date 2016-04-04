var Product = require("../models/Product.js")

module.exports = {
  index: function(req, res){
    Product.find({}).exec(function(err, products){
      if (err) throw err
      res.json({success: true, message: "All Products", products: products})
    })
  }
}
