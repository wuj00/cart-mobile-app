var
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  body_parser = require('body-parser'),
  morgan = require('morgan'),
  path = require('path'),
  config = require('./config.js'),
  port = process.env.PORT || 8100,
  // bcrypt = require('bcrypt-nodejs'),
  userRoutes = require('./routes/users.js'),
  productsRoutes = require('./routes/products.js'),
  categoryRoutes = require('./routes/categories.js'),
  commentRoutes = require('./routes/comments.js'),
  likesRoutes = require('./routes/likes.js'),
  relationRoutes = require('./routes/relations.js'),
  reviewRoutes = require('./routes/reviews.js'),
  cors = require('cors'),
  dotenv = require('dotenv').load({silent: true}),
  jwt = require('jsonwebtoken')

// console.log(process.env.MLAB_LINK)
mongoose.connect(config.databaseUrl, function(err){
  if(err) throw err
  console.log("Connected to mongodb " + config.databaseUrl)
})

//middleware
app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())
app.use(express.static(path.join(__dirname, '../www')))

app.use(morgan("dev"))

app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0 );
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'Options') {
      res.send(200);
    } else {
      return next();
    }
  })
//console.log(process.env.secret)
app.set('superSecret', process.env.secret)

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../www/index.html'))
})

app.use('/users', userRoutes)
app.use('/likes', likesRoutes)
app.use('/products', productsRoutes)
app.use('/category', categoryRoutes)
app.use('/comments', commentRoutes)
app.use('/relations', relationRoutes)
app.use('/reviews', reviewRoutes)


// process.env.PORT
app.listen(process.env.PORT, function(err){
  if(err) throw err
  console.log("Listening to port " + process.env.PORT);

})
