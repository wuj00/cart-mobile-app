var
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  body_parser = require('body-parser'),
  morgan = require('morgan'),
  config = require('./config.js'),
  port = process.env.PORT || 8100

mongoose.connect(config.databaseUrl, function(err){
  if(err) throw err
  console.log("Connected to mongodb", config.databaseUrl);
})
//middleware
app.use(body_parser.urlencoded({extended: false}))
app.use(body_parser.json())

app.use(morgan("dev"))

app.listen(port, function(err){
  if(err) throw err
  console.log("Listening to port 8100");
})
