var
  mongoose = require('mongoose'),
  schema = mongose.Schema,
  ObjectId = Schema.Types.ObjectId

var user_schema = Schema({
  name: string,
  username: {type: String, unique: true, }
})
