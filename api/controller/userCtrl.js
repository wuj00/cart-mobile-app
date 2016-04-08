var
  User = require('../models/User.js'),
  jwt = require('jsonwebtoken')

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
  create: function(req, res){
    var new_user = new User(req.body)
    new_user.password = new_user.generateHash(req.body.password)
    new_user.save(function(err, user){
      if (err) throw err
      var token = jwt.sign(user.toObject(), process.env.secret.toString(), {
        expiresIn: 6000
      })
      res.json({message: 'user created and here is token', user: user, token: token})
    })
  },
  authenticate: function(req, res){
    User.findOne({username: req.body.username}).exec(function(err, user){
      if (err) throw err
      if (!user) return res.json({success: false, message: "No user found with that username"})
      console.log(!user.validPassword(req.body.password))
      if (user && !user.validPassword(req.body.password)) return res.json({success: false, message: "wrong password"})
      var token = jwt.sign(user.toObject(), process.env.secret.toString(), {
        expiresIn: 24000
      })
      console.log("here is your token: " + token)
      res.json({success: true, message: "password correct. here is your token!", token: token, user: user})
    })
  },
  protect: function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
      jwt.verify(token, process.env.secret, function(err, decoded){
        if (err) return res.json({success: false, message: "wrong token infomation"})
        req.decoded = decoded
        next()
      })
    } else {
      return res.status(403).json({
        success: false,
        message: "no token was provided"
      })
    }
  }
}
