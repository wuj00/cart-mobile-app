var Like = require('../models/Like.js')

module.exports = {

    create: function(req, res){
        var newLike = new Like(req.body)
        newLike.save(function(err, like){
            res.json({success: true, message: "Liked!", like: like})
        })
    },

    delete: function(req, res){
        Like.findOne({_id: req.params.id}, function(err, like){
          if (err) throw err
          like.remove({_id: req.params.id}, function(err){
            if (err) throw err
            res.json({success: true, message: "Unliked!!"})
          })
        })
      }
}//closing
