var
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId

var like_schema = Schema({
        user: {type: ObjectId, ref: "User"},
        product: {type: ObjectId, ref: "Product"}
    })

var Like = mongoose.model('Like', like_schema)
module.exports = Like
