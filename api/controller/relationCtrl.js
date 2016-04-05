var Relation = require("../models/Relation.js")


module.exports = {
  create: function(req,res){
    var relation = new Relation(req.body)
    relation.save(function(err, product){
      if(err) throw err
      res.json(product)
    })
  },
  destroy: function(req,res){
    Relation.findOne({_id: req.params.id}, (function(err, relation){
      if(err) throw err
      relation.remove({_id: req.params.id}, function(err){
        res.json({success: true, message: "Deleted"})
      })
    }))
  }

}
