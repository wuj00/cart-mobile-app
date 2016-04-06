var
  User = require('../models/User.js')

module.exports = {

  show: function(req,res){
    User.findOne({_id: req.params.id}).populate("following").exec(function(err,user){
      if(err) console.log(err)
      console.log(user)
      res.json(user)
    })
  },
  index: function(req,res){
    User.find({}).exec(function(err,users){
      if(err) console.log(err);
      res.json(users)
    })
  },
  destroy: function(req,res){
    User.findOne({_id: req.params.id}, function(err,user){
      if(err) throw err
      User.remove({_id: req.params.id}, function(err){
        if(err) throw err
        res.json(user)
      })
    })
  },
  update: function(req,res){
    User.findOne({_id: req.params.id}).exec(function(err, user){
      if(err) throw err
      user.name = req.body.name
      user.username = req.body.username
      user.email = req.body.email
      user.picture = req.body.picture
      user.description = req.body.description
      user.save(function(err, saved_user){
        if(err) throw err
        res.json(saved_user)
      })
      res.json(user)
    })
  },
  create: function(req,res){
    var new_user = new User(req.body)
    new_user.save(function(err, user){
      if(err) throw err
      res.json(user)
    })
  }
}
