var Comment = require("../models/Comment.js")

module.exports = {
  index: function(req, res){
    Comment.find({}).exec(function(err, comments){
      if (err) throw err
      res.json({success: true, message: "All comments", comments: comments})
    })
  },
  destroy: function(req, res){
    Comment.findOne({_id: req.params.id}, function(err, comment){
      if(err) throw err
      Comment.remove({_id: req.params.id}, function(err){
        if(err) throw err
        res.json(comment)
      })
    })
  },
  update: function(req,res){
    Comment.findOne({_id: req.params.id}).exec(function(err,comment){
      if(err) throw err
      comment.description = req.body.description
      comment.save(function(err, comment){
        if(err) throw err
        res.json(comment)
      })
      res.json(comment)
    })
  },
  create: function(req,res){
    var comment = new Comment(req.body)
    comment.save(function(err,comment){
      if(err) throw err
      res.json(user)
    })
  }
}
