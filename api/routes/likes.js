var
    express = require('express'),
    likeRouter = express.Router(),
    likeCtrl = require('../controllers/likeCtrl.js')

likeRouter.route('/likes')
    .post(likeCtrl.create)
    .delete(likeCtrl.delete)

module.exports = likeRouter
