var
  express = require('express'),
  comment_router = express.Router(),
  comment_ctrl = require('../controller/commentCtrl.js')

comment_router.route('/')
  .get(comment_ctrl.index)


module.exports = comment_router
