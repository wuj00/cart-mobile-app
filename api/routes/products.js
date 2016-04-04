var
  express = require('express'),
  product_router = express.Router(),
  product_ctrl = require('../controller/productCtrl.js')

product_router.route('/')
  .get(product_ctrl.index)
  .post(product_ctrl.create_product)
product_router.route('/:id')
  .get(product_ctrl.one_product)
  .patch(product_ctrl.edit_product)
  .delete(product_ctrl.delete_product)

module.exports = product_router
