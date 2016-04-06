var Product = require("../models/Product.js")
var streamingS3 = require('streaming-s3')
var multiparty = require('multiparty')
var fs = require('fs')

module.exports = {
  index: function(req, res){
    Product.find({}).exec(function(err, products){
      if (err) throw err
      res.json({success: true, message: "All Products", products: products})
    })
  },
  one_product: function(req, res){
    Product.findById(req.params.id).populate('_creator').exec(function(err, product){
      if (err) throw err
      res.json(product)
    })
  },
  create_product: function(req, res){

    function toS3(fileName, req){
      var fArray = fileName.split('')
      fileName = fArray[fArray.length - 1]
      console.log(fileName, 'this is file name is tos3 <<<<<<<<<<<<<<<<')
      console.log(req, 'this is req param is tos3 <<<<<<<<<<<<<<<<')
      //CREATE NEW Photo
     //var path = absolutePath + '/public/images/users/' + req.session.userId + '/';
     var path = './public/images/' // change to public/images
     //var fileName = rStr.stringDate12() + "."
     var maxSize = 87934588;
     var options = {uploadDir: path};
     var form = new multiparty.Form();
     form.keepExtensions = true;
     form.autoFiles = false;
     form.maxFileSize = 8793458;
     form.on('error', function(message) {
         res.end();
         res.status(413).send({message:'Upload too large'});
         return;
     });
     form.on('progress', function(recv, total){
       console.log('on progress ==========')
       if(total >= maxSize){
           this.emit('error');
       }
     })
     form.on('file', function(name, file) {
       console.log('got to form on name file <<<< !!!')
         var type = file.headers['content-type'];
         type = type.split('/');
         type = type[1];
         fs.rename(file.path, path + fileName);
         path = './public/images'; // public/images
         //MODIFICATION OF BELOW FUNCITON
       console.log('closing')
       var fStream = fs.createReadStream('./public/images/' + fileName)
       // SAVE PATH TO VIDEO ON S3
       var uploader = new streamingS3(fStream, {accessKeyId: process.env.AWS_ACCESS_ID, secretAccessKey: process.env.AWS_ACCESS_KEY}, // from .env
       {
         Bucket: 'testcartphotos', // bucket name
         Key: fileName, // filename
         ContentType: 'image/jpg'
       }, function(err, resp, stats){
           if(err) return console.log('Error with upload: ', err);
           //Save data on video here (https://videoemo.s3.amazonaws.com/)
           console.log('Upload Stats:', stats);
           console.log('Upload Successful: ', resp);
         }
       );
     });
    }

    var new_product = new Product(req.body)
    new_product.save(function(err, product){
      if (err) throw err
      console.log('this is in save')
      toS3(product.photos[0], req)
      res.json({success: true, message: "successfully created product", product: product})
    })
  },
  edit_product: function(req, res){
    Product.findOne({_id: req.params.id}).exec(function(err, product){
      if (err) throw err
      product.description = req.body.description
      product.catagory = req.body.catagory
      product.name = req.body.name
      product.photos = req.body.photos
      product.price = req.body.price
      product.quantity = req.body.quantity
      product.save(function(err, saved_product){
        if (err) throw err
        res.json({success: true, message: "product updated", product: saved_product})
      })
    })
  },
  delete_product: function(req, res){
    Product.findOne({_id: req.params.id}).exec(function(err, product){
      if (err) throw err
      product.remove({_id: req.params.id}, function(err){
        res.json({success: true, message: "successfully deleted product"})
      })
    })
  }
}
