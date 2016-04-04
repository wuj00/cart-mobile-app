var
    express = require('express'),
    likesRouter = express.Router(),
    likeCtrl = require('../controller/likeCtrl.js')

likesRouter.route('/')
    .post(likeCtrl.create)
    
likesRouter.route('/:id')
    .delete(likeCtrl.delete)

module.exports = likesRouter
