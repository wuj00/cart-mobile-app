var
  express = require('express'),
  relationRouter = express.Router(),
  relationCtrl = require('../controller/relationCtrl.js')


relationRouter.route('/')
  .post(relationCtrl.create)

relationRouter.route('/:id')
  .delete(relationCtrl.destroy)
  .get(relationCtrl.show)

module.exports = relationRouter
