var
  express = require('express'),
  userRouter = express.Router(),
  userCtrl = require('../controllers/users.js'),
  User = require('../models/User.js'),


userRouter.routes('/')
  .get(userCtrl.users)
  .post(userCtrl.create)

userRouter.routes('/:id')
  .get(userCtrl.profile)
  .delete(userCtrl.destroy)
  .update(userCtrl.update)


module.exports = userRouter
