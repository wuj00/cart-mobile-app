var
  express = require('express'),
  comment_router = express.Router(),
  comment_ctrl = require('../controller/commentCtrl.js')

comment_router.route('/')
  .get(comment_ctrl.index)
  .post(comment_ctrl.create)

comment_router.route('/:id')
  .patch(comment_ctrl.update)
  .delete(comment_ctrl.destroy)

module.exports = comment_router
