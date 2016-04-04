var Catagory = require("../models/Catergory.js")

module.exports = {
  index: function(req, res){
    Catagory.find({}).exec(function(err, catagories){
      if (err) throw err
      res.json({success: true, message: "All catagories", catagories: catagories})
    })
  },
  one_catagory: function(req, res){
    Catagory.findById(req.params.id).exec(function(err, catagory){
      if (err) throw err
      res.json({success: true, catagory: catagory})
    })
  },
  create_catagory: function(req, res){
    var new_catagory = new Catagory(req.body)
    new_catagory.save(function(err, catagory){
      if (err) throw err
      res.json({success: true, message: "catagory successfully added", catagory: catagory})
    })
  },
  edit_catagory: function(req, res){
    Catagory.findOne({_id: req.params.id}).exec(function(err, catagory){
      if (err) throw err
      catagory.name = req.body.name
      catagory.save(function(err, saved_catagory){
        if (err) throw err
        res.json({success: true, message: "successfully updated catagory", catagory: saved_catagory})
      })
    })
  },
  delete_catagory: function(req, res){
    Catagory.findOne({_id: req.params.id}).exec(function(err, catagory){
      if (err) throw err
      catagory.remove({_id: req.params.id}, function(err){
        if (err) throw err
        res.json({success: true, message: "catagory deleted"})
      })
    })
  }
}
