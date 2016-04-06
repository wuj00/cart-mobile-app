angular.module('starter.controllers', [])
  .controller('MainCtrl', MainCtrl)
  .controller('HomeCtrl', HomeCtrl)
  .controller('SearchCtrl', SearchCtrl)
  .controller('PostCtrl', PostCtrl)
  .controller('NotificationsCtrl', NotificationsCtrl)
  .controller('ProfileCtrl', ProfileCtrl)
  
MainCtrl.$inject = ["$stateParams"]
HomeCtrl.$inject = ["$stateParams", "userService", "productService"]
SearchCtrl.$inject = ["productService", "categoryService", "userService"]
PostCtrl.$inject = ["$stateParams", "userService", "productService", "$cordovaCamera", "$scope"]
NotificationsCtrl.$inject = ["$stateParams", "userService"]
ProfileCtrl.$inject = ["$stateParams", "userService"]

// MainCtrl
function MainCtrl($stateParams){
  var vm = this
  vm.currentUserId = "570428cbe54eb0a80b4ea317"
}

// News Feed
function HomeCtrl($stateParams, userService, productService){
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
      console.log(result.following[i]._followed,  i );
    }
    userService.show(result.following[i]._followed).success(function(result){
      self.peopleArray.push(result)
      for(var p=0; p < result.products.length; p++) {
      if(result){
        // the person your following

        console.log(self.peopleArray);
      }
      productService.show(result.products[p]).success(function(result){
        if(result){
          console.log(result);
          // the person your followings product
          self.productsArray.push(result)
          console.log(self.productsArray);
        }
      })
    }
    })
  }
})
}
// Search Catagory
function SearchCtrl(productService, categoryService, userService){
  var self = this
  self.title = "Search Ctrl title"
  productService.index().success(function(results){
    self.allProducts = results.products
  })
  categoryService.index().success(function(results){
    self.allCatagories = results.catagories
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

    $cordovaCamera.getPicture(picOptions).then(function(data){
      self.newProduct.photos = [data]
    })
  }

  self.createProduct = function(){
    self.newProduct._creator = $scope.$parent.main.currentUserId
    self.newProduct.catagory = "57047226bae3c04b25210206"
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
function ProfileCtrl($stateParams, userService){
  var self = this
  self.title = "Profile Ctrl yes"
  userService.show($stateParams.user).success(function(result){
    if (result){
      console.log(result)
      self.user = result
    }
  })
}
