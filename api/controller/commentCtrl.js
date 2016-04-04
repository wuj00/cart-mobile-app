var Comment = require("../models/Comment.js")

module.exports = {
  index: function(req, res){
    Comment.find({}).exec(function(err, comments){
      if (err) throw err
      res.json({success: true, message: "All comments", comments: comments})
    })
  }
}
