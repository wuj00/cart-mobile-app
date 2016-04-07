var Category = require("../models/Category.js")

module.exports = {
  index: function(req, res){
    Category.find({}).exec(function(err, categories){
      if (err) throw err
      res.json({success: true, message: "All categories", categories: categories})
    })
  },
  one_category: function(req, res){
    Category.findById(req.params.id).exec(function(err, category){
      if (err) throw err
      res.json({success: true, category: category})
    })
  },
  create_category: function(req, res){
    var new_category = new Category(req.body)
    new_category.save(function(err, category){
      if (err) throw err
      res.json({success: true, message: "category successfully added", category: category})
    })
  },
  edit_category: function(req, res){
    Category.findOne({_id: req.params.id}).exec(function(err, category){
      if (err) throw err
      category.name = req.body.name
      category.save(function(err, saved_category){
        if (err) throw err
        res.json({success: true, message: "successfully updated category", category: saved_category})
      })
    })
  },
  delete_category: function(req, res){
    Category.findOne({_id: req.params.id}).exec(function(err, category){
      if (err) throw err
      category.remove({_id: req.params.id}, function(err){
        if (err) throw err
        res.json({success: true, message: "category deleted"})
      })
    })
  }
}
