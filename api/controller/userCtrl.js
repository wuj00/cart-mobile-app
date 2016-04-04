var
  User require('../models/User.js')

module.exports = {

  profile: function(req,res){
    User.findOne({_id: req.params.id}).exec(function(err,user){
      if(err) console.log(err)
      console.log(user)
      res.json(user)
    })
  },
  users: function(req,res){
    User.find({}).exec(function(err,users){
      if(err) console.log(err));
      res.json(users)
    })
  },
  destroy: function(req,res){
    User.findOneAndRemove({_id: req.params.id}).exec(function(err,user){
      if(err) throw err
      res.json(user)
    })
  },
  update: function(req,res){
    User.findOneAndUpdate({_id: req.params.id}).exec(function(err, user){
      if(err) throw err
      res.json(user)
    })
  }
}
