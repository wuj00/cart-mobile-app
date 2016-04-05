angular.module('starter.controllers', [])
  .controller('MainCtrl', MainCtrl)
  .controller('HomeCtrl', HomeCtrl)
  .controller('SearchCtrl', SearchCtrl)
  .controller('PostCtrl', PostCtrl)
  .controller('NotificationsCtrl', NotificationsCtrl)
  .controller('ProfileCtrl', ProfileCtrl)

MainCtrl.$inject = ["$stateParams"]
HomeCtrl.$inject = ["$stateParams", "userService"]
SearchCtrl.$inject = ["productService", "categoryService"]
PostCtrl.$inject = ["$stateParams", "userService", "productService"]
NotificationsCtrl.$inject = ["$stateParams", "userService"]
ProfileCtrl.$inject = ["$stateParams", "userService"]

// MainCtrl
function MainCtrl($stateParams){
  var vm = this
  vm.currentUserId = "5702f9632fe016840c2933fa"
}

// News Feed
function HomeCtrl($stateParams, userService){
  var self = this
  self.title = "This is the home ctrl title"
  // $stateParams.user = "5702f9632fe016840c2933fa"
  userService.show($stateParams.user).success(function(result){
    if (result){
      console.log(result)
      self.user = result
    }
  })
}

// Search Catagory
function SearchCtrl(productService, categoryService){
  var self = this
  self.title = "Search Ctrl title"
  productService.index().success(function(results){
    self.allProducts = results.products
  })
  categoryService.index().success(function(results){
    self.allCatagories = results.catagories
  })
}

// Post a new product
function PostCtrl($stateParams, userService, productService){
  var self = this
  self.title = "Post Ctrl yeah"

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
