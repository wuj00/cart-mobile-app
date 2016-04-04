var
  express = require('express'),
  product_router = express.Router(),
  product_ctrl = require('../controller/productCtrl.js')

product_router.route('/')
  .get(product_ctrl.index)

module.exports = product_router
