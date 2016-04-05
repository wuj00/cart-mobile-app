var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId


var relation_schema = Schema({
  // current user
  _follower: {type: ObjectId, ref: "User"},
  // other user
  _followed: {type: ObjectId, ref: "User"}
})

// when following a person
relation_schema.post('save', function(relation){
  User.findOne({_id: relation._follower}).exec(function(err, user){
    if (err) throw err
    if (user.following.indexOf(relation._id) === -1){
      user.following.push(relation._id)
      user.save()
    }
  })
  User.findOne({_id: relation._followed}).exec(function(err, user){
    if (err) throw err
    if (user.followers.indexOf(relation._id) === -1){
      user.followers.push(relation._id)
      user.save()
    }
  })
})

// when unfollowing a person
relation_schema.post('remove', function(relation){
  User.findById(relation._follower).exec(function(err, user){
    if (user){
      user.following.splice(user.following.indexOf(relation._id), 1)
      user.save()
    }
  })
  User.findById(relation._followed).exec(function(err, user){
    if (user){
      user.followers.splice(user.followers.indexOf(relation._id), 1)
      user.save()
    }
  })
})

var Relation = mongoose.model('Relation', relation_schema)

module.exports = Relation
