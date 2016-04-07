var
  express = require('express'),
  userRouter = express.Router(),
  userCtrl = require('../controller/userCtrl.js')

userRouter.post('/authenticate', userCtrl.authenticate)
userRouter.route('/')
  .get(userCtrl.index)
  .post(userCtrl.create)

// userRouter.use(userCtrl.protect)
userRouter.route('/:id')
  .get(userCtrl.show)
  .delete(userCtrl.destroy)
  .patch(userCtrl.update)


module.exports = userRouter
