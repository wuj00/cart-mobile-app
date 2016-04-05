var
  express = require('express'),
  reviewRouter = express.Router(),
  reviewCtrl = require('../controller/reviewCtrl.js')


reviewRouter.route('/')
  .post(reviewCtrl.create)

reviewRouter.route('/:id')
  .delete(reviewCtrl.destroy)



module.exports = reviewRouter
