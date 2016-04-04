var
  express = require('express'),
  catagory_router = express.Router(),
  catagory_ctrl = require('../controller/catergoryCtrl.js')

catagory_router.route('/')
  .get(catagory_ctrl.index)
  .post(catagory_ctrl.create_catagory)
catagory_router.route('/:id')
  .get(catagory_ctrl.one_catagory)
  .patch(catagory_ctrl.edit_catagory)
  .delete(catagory_ctrl.delete_catagory)

module.exports = catagory_router
