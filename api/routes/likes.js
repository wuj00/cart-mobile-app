var
    express = require('express'),
    likesRouter = express.Router(),
    likeCtrl = require('../controller/likeCtrl.js')

likesRouter.route('/likes')
    .post(likeCtrl.create)
    .delete(likeCtrl.delete)

module.exports = likesRouter
