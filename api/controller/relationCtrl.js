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
    Relation.findOne({_id: req.params.id}, function(err, relation){
      if(err) throw err
      console.log(relation, "<<<<<< this is relation <<<<< <<<< <<< <<< < ")
      relation.remove({_id: req.params.id}, function(err){
        res.json({success: true, message: "Deleted"})
      })
    })
  },
  show: function(req, res){
    Relation.findOne({_id: req.params.id}).exec(function(err, relation){
      if (err) throw err
      res.json(relation)
    })
  }

}
