var
  express = require('express'),
  catagory_router = express.Router(),
  catagory_ctrl = require('../controller/catergoryCtrl.js')

catagory_router.route('/')
  .get(catagory_ctrl.index)

module.exports = catagory_router
