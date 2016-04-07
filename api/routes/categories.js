var
  express = require('express'),
  category_router = express.Router(),
  category_ctrl = require('../controller/categoryCtrl.js')

category_router.route('/')
  .get(category_ctrl.index)
  .post(category_ctrl.create_category)
category_router.route('/:id')
  .get(category_ctrl.one_category)
  .patch(category_ctrl.edit_category)
  .delete(category_ctrl.delete_category)

module.exports = category_router
