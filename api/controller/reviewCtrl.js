var
  Review = require('../models/Review.js')

module.exports = {
  create: function(req,res){
    var review = new Review(req.body)
    review.save(function(err,user){
      if(err) throw err
      res.json(user)
    })
  },
  destroy: function(req,res){
    Review.findOne({_id: req.params.id}, function(err, review){
      if(err) throw err
      Review.remove({_id: req.params.id}, function(err){
        if(err) throw err
        res.json(review)
      })
    })
  }
}
