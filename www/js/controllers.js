angular.module('starter.controllers', [])
  .controller('MainCtrl', MainCtrl)
  .controller('HomeCtrl', HomeCtrl)
  .controller('SearchCtrl', SearchCtrl)
  .controller('PostCtrl', PostCtrl)
  .controller('NotificationsCtrl', NotificationsCtrl)
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('PhotoViewCtrl', PhotoViewCtrl)

MainCtrl.$inject = ["$stateParams"]
HomeCtrl.$inject = ["$stateParams", "userService", "productService", 'likeService']
SearchCtrl.$inject = ["productService", "categoryService", "userService"]
PostCtrl.$inject = ["$stateParams", "userService", "productService", "$cordovaCamera", "$scope"]
NotificationsCtrl.$inject = ["$stateParams", "userService"]
ProfileCtrl.$inject = ["$stateParams", "userService"]
PhotoViewCtrl.$inject = ["$stateParams", "productService"]

// MainCtrl
function MainCtrl($stateParams){
  var vm = this

  vm.currentUserId = "570443322d0580e71b6a53f7"
}

// News Feed
function HomeCtrl($stateParams, userService, productService, likeService){
  var self = this
  self.productsArray = []
  self.peopleArray = []

  self.title = "This is the home ctrl title"
  // $stateParams.user = "5702f9632fe016840c2933fa"
  userService.show($stateParams.user).success(function(result){
    for(var i=0; i < result.following.length; i++) {
    if (result){
      // your user
      self.user = result
    }
    userService.show(result.following[i]._followed).success(function(result){
      self.peopleArray.push(result)
      for(var p=0; p < result.products.length; p++){
      if(result){
        // the person your following
      }
      productService.show(result.products[p]).success(function(result){
        if(result){
          // the person your followings product
          self.productsArray.push(result)
        }
      })
    }
    })
  }
})
  self.liked = function(product){
    console.log(product, 'insideeeeeeee');
    likeService.post(({user:main.currentUserId, _product:product})).success(function(result){
      console.log(result);
      if(result){
        console.log(result);
      }
    })
  }

}
// Search Catagory
function SearchCtrl(productService, categoryService, userService){
  var self = this
  self.title = "Search Ctrl title"
  productService.index().success(function(results){
    self.allProducts = results.products
  })
  categoryService.index().success(function(results){
    self.allCatagories = results.categories
  })
  userService.index().success(function(results){
    self.allUsers = results
  })
}

// Post a new product
function PostCtrl($stateParams, userService, productService, $cordovaCamera, $scope){
  // console.log($scope.$parent.main)
  var self = this
  self.title = "Post Ctrl yeah"
  self.takePhoto = function(){
    var newProduct = {}
    var picOptions = {
      targetWidth: 300,
      targetHeight: 300
    }
    //file:///var/mobile/Containers/Data/Application/A9F17893-BBFE-41AC-9BF1-0F8F9EAC9D00/tmp/cdv_photo_014.jpg
    $cordovaCamera.getPicture(picOptions).then(function(data){
      self.newProduct.photos = [data]
    })
  }

  self.createProduct = function(){
    self.newProduct._creator = $scope.$parent.main.currentUserId
    self.newProduct.catagory = "5704722bbae3c04b25210207"
    console.log(self.newProduct, 'this is objs')
    productService.create(self.newProduct).success(function(results){
      console.log(results)
      self.resultFromPost = results
    })
  }
}

// show updates
function NotificationsCtrl($stateParams, userService){
  var self = this
  self.title = "Notifications Ctrl yup"

}

// user profile
function ProfileCtrl($stateParams, userService, $location){
  var self = this
  self.title = "Profile Ctrl yes"
  userService.show($stateParams.user).success(function(result){
    if (result){
      console.log(result)
      self.user = result
    }
  })
  function redirecter(id){
    $location.path("/#/tab/photo/:productId")
  }
}

function PhotoViewCtrl($stateParams, productService){
  var self = this
  productService.show($stateParams.productId).success(function(result){
    if(result){
      console.log(result, "this is from the PhotoViewCtrl");
      self.product = result
    }
  })
}
