var
  express = require('express'),
  userRouter = express.Router(),
  userCtrl = require('../controller/userCtrl.js')


userRouter.route('/')
  .get(userCtrl.users)
  .post(userCtrl.create)

userRouter.route('/:id')
  .get(userCtrl.profile)
  .delete(userCtrl.destroy)
  .patch(userCtrl.update)


module.exports = userRouter
