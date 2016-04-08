angular.module('starter.controllers', [])
  .controller('MainCtrl', MainCtrl)
  .factory('authInterceptor', authInterceptor)
  .service('user', userService)
  .service('auth', authService)
  .constant('API', 'http://localhost:8100/users')
  .controller('HomeCtrl', HomeCtrl)
  .controller('SearchCtrl', SearchCtrl)
  .controller('PostCtrl', PostCtrl)
  .controller('NotificationsCtrl', NotificationsCtrl)
  .controller('ProfileCtrl', ProfileCtrl)
  .controller('PhotoViewCtrl', PhotoViewCtrl)


MainCtrl.$inject = ["$stateParams", "$rootScope", "$state", "auth", "user", "$window"]
HomeCtrl.$inject = ["$stateParams", "userService", "productService", 'likeService', "$window", "$ionicLoading", "$ionicSlideBoxDelegate"]
SearchCtrl.$inject = ["productService", "categoryService", "userService", "relationService", "$window", "relationService", "$ionicLoading", "$ionicSlideBoxDelegate"]
PostCtrl.$inject = ["$stateParams", "userService", "productService", "$cordovaCamera", "$scope", "$cordovaFileTransfer", "$cordovaFile", "$ionicLoading", "$ionicSlideBoxDelegate"]
NotificationsCtrl.$inject = ["$stateParams", "userService", "$ionicLoading"]
ProfileCtrl.$inject = ["$stateParams", "userService", "$scope", "$window", "$ionicLoading"]
PhotoViewCtrl.$inject = ["$stateParams", "productService", "$ionicLoading", "$ionicSlideBoxDelegate"]

// MainCtrl
function MainCtrl($stateParams, $rootScope, $state, auth, user, $window, $ionicLoading){
  var self = this
  self.title = "Please show up!!!"
//  console.log(self, ',,,')
  self.currentUserId = ""
  self.newUser = {}
  self.loginUser = {}
  // body tag
  $rootScope.$on('$stateChangeStart', function(event, toState){
    if (toState.name === "tab.profile-user" && !self.isAuthed()){
      event.preventDefault()
      $state.go('login')
    }

    // if ((toState.name === "tab.search" || toState.name === "tab.newsFeed-user" || toState.name === "tab.post-user" || toState.name === "tab.notifications-user" || toState.name === "tab.profile-user") && !self.isAuthed()){
    //   event.preventDefault()
    //   $state.go("login")
    // }
  })

  function handleRequest(res) {
      var token = res.data ? res.data.token : null;
      if (token) {
        console.log('JWT:', token);
        auth.saveToken(token)
        self.currentUserId = res.data.user._id
        $window.localStorage['cID'] = self.currentUserId;
        console.log('id>>>', self.currentUserId)
        $state.go('tab.profile-user', {user: self.currentUserId})
       }
      // self.message = res.data.message;
    }
    self.login = function() {
      console.log('got to main login func')
      user.login(self.loginUser.username, self.loginUser.password)
        .then(handleRequest, handleRequest)
    }
    self.register = function() {
      user.register(self.newUser.username, self.newUser.password, self.newUser.email)
        .then(handleRequest, handleRequest)
    }
    self.getQuote = function() {
      user.getQuote()
        .then(handleRequest, handleRequest)
    }
    self.logout = function() {
      auth.logout && auth.logout()
    }
    self.isAuthed = function() {
      return auth.isAuthed ? auth.isAuthed() : false
    }
}


function authInterceptor(API, auth) {
    return {
      request: function(config) {
        var token = auth.getToken();
        if (token) {
          config.headers['x-access-token'] = token;
          //console.log(config.headers)
        }
        //console.log(config)
        return config;
      },
      response: function(res){
         if(res.data.token){auth.saveToken(res.data.token)};
         return res;
       },
    }
  }

  function authService($window) {
    var self = this
    self.parseJwt = function(token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace('-', '+').replace('_', '/')
      return JSON.parse($window.atob(base64))
    }
    // save the token
    self.saveToken = function(token) {
      $window.localStorage['jwtToken'] = token;
    }
    // get token
    self.getToken = function() {
      return $window.localStorage['jwtToken'];
    }
    // checking the token to see if user is authenticated
    self.isAuthed = function() {
      var token = self.getToken();
      if(token) {
        var params = self.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    }
    // removes token from local storage
    self.logout = function() {
      $window.localStorage.removeItem('jwtToken');
      $window.localStorage.removeItem('cID');
    }
  }
  function userService($http, API, auth) {
    var self = this;
    self.getQuote = function() {
      return $http.get(API + '/api/auth/quote')
    }

    self.login = function(username, password) {
      return $http.post(API + '/authenticate', {
          username: username,
          password: password
        })
    }
    self.register = function(username, password, email){
      return $http.post(API, {
        username: username,
        password: password,
        email: email
      })
    }
  }

// News Feed
function HomeCtrl($stateParams, userService, productService, likeService, $window, $ionicLoading){
  var self = this
  self.productsArray = []
  self.peopleArray = []

  // Setup the loader
  $ionicLoading.show({
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    template: '<img src="img/preloader2.svg"/>'
  });

  self.title = "This is the home ctrl title"
  // $stateParams.user = "5702f9632fe016840c2933fa"
  userService.show($window.localStorage.getItem('cID')).success(function(result){
    for(var i=0; i < result.following.length; i++) {
    if (result){
      // your user
      self.user = result
      console.log(result);
    }
    userService.show(result.following[i]._followed).success(function(result){
      self.peopleArray.push(result)
      console.log(result, "Hey arman");

      for(var p=0; p < result.products.length; p++){
      if(result){
        // the person your following
      }
      productService.show(result.products[p]).success(function(result){
        if(result){
          // the person your followings product
          self.productsArray.push(result)
          $ionicLoading.hide()
        }
      })
    }
    })
  }
})
  self.liked = function(product){
    console.log(product, 'insideeeeeeee');
    likeService.post(({user: $window.localStorage.getItem('cID'), _product:product})).success(function(result){
      console.log(result);
      if(result){
        console.log(result);
      }
    })
  }

}
// Search Category
function SearchCtrl(productService, categoryService, userService, relationService, $window, relationService, $ionicLoading){
  var self = this

  // Setup the loader
  $ionicLoading.show({
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    template: '<img src="img/preloader2.svg"/>'
  });

  self.title = "Search Ctrl title"
  productService.index().success(function(results){
    self.allProducts = results.products
  })
  categoryService.index().success(function(results){
    self.allCategories = results.categories
  })
  userService.index().success(function(results){
    self.allUsers = results
  })
  self.followThisUser = function(toFollow){
    userService.show(toFollow).success(function(result){
      result.followers.forEach(function(el, i){
        if (el._follower === $window.localStorage.getItem('cID')) {
          relationService.destroy(el._id).success(function(t){
            console.log(el._id, 'this is id of relation')
            console.log(t, '<<<<< destroyed!!!')
            self.followP = true
          })
        } else if (i == result.followers.length - 1) {
          relationService.create({_follower: $window.localStorage.getItem('cID'), _followed: toFollow}).success(function(results){
            console.log(results, "added like")
            self.followP = false
          })
        }
      })
    })
  }
  $ionicLoading.hide()
}

// Post a new product
function PostCtrl($stateParams, userService, productService, $cordovaCamera, $scope, $cordovaFileTransfer, $cordovaFile, $ionicSlideBoxDelegate){
  // $scope.testFileUpload = function () {
  //    // Destination URL
  //    var url = "http://localhost:8100/users";
  //
  //    //File for Upload
  //    console.log($cordovaFile)
  //    var targetPath = "http://www.top13.net/wp-content/uploads/2014/11/32-small-flowers.jpg";
  //
  //    // File name only
  //    var filename = targetPath.split("/").pop();
  //
  //    var options = {
  //         fileKey: "file",
  //         fileName: filename,
  //         chunkedMode: false,
  //         mimeType: "image/jpg",
  //         params : {'directory':'upload', 'fileName':filename}
  //     };
  //
  //     $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
  //         console.log("SUCCESS: " + JSON.stringify(result.response));
  //     }, function (err) {
  //         console.log("ERROR: " + JSON.stringify(err));
  //     }, function (progress) {
  //         console.log(progress)
  //     });
  // }
  // console.log($scope.$parent.main)
  var self = this
  self.title = "Post Ctrl yeah"
  self.takePhoto = function(){
    // $scope.testFileUpload()
    var newProduct = {}
    var picOptions = {
      targetWidth: 300,
      targetHeight: 300
    }
    //file:///var/mobile/Containers/Data/Application/A9F17893-BBFE-41AC-9BF1-0F8F9EAC9D00/tmp/cdv_photo_014.jpg
    //"http://www.top13.net/wp-content/uploads/2014/11/32-small-flowers.jpg"
    //console.log($cordovaFileTransfer)
    $cordovaCamera.getPicture(picOptions).then(function(data){
      self.newProduct.photos = [data]
    })

  }

    self.navSlide = function(index) {
      console.log("slide", index)
      $ionicSlideBoxDelegate.slide(index, 500)
    }


  self.createProduct = function(){
    self.newProduct._creator = $scope.$parent.main.currentUserId
    self.newProduct.category = "57047231bae3c04b25210208"
    console.log(self.newProduct, 'this is objs')
    productService.create(self.newProduct).success(function(results){
      console.log(results)
      self.resultFromPost = results
    })
  }
}

// show updates
function NotificationsCtrl($stateParams, userService, $ionicLoading){
  var self = this

  // Setup the loader
  $ionicLoading.show({
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    template: '<img src="img/preloader2.svg"/>'
  });

  self.title = "Notifications Ctrl yup"
  $ionicLoading.hide()
}

// user profile
function ProfileCtrl($stateParams, userService, $scope, $window, $ionicLoading){
  // console.log($scope.$parent.$parent.$parent.$parent.$parent.main.currentUserId)
  console.log($window.localStorage.getItem('cID'))
  var self = this

  // Setup the loader
  $ionicLoading.show({
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    template: '<img src="img/preloader2.svg"/>'
  });

  self.title = "Profile Ctrl yes"
  userService.show($window.localStorage.getItem('cID')).success(function(result){
    if (result){
      console.log(result)
      self.user = result
    }
    $ionicLoading.hide()
  })
  function redirecter(id){
    $location.path("/#/tab/photo/:productId")
  }
  self.edit = function(){
    userService.update($window.localStorage.getItem('cID'), self.edit).success(function(result){
      if(result){
        console.log(result);

      }
    })
  }
}

function PhotoViewCtrl($stateParams, productService, $ionicLoading){
  var self = this

  // Setup the loader
  $ionicLoading.show({
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    template: '<img src="img/preloader2.svg"/>'
  });

  productService.show($stateParams.productId).success(function(result){
    if(result){
      console.log(result, "this is from the PhotoViewCtrl");
      self.product = result
      $ionicLoading.hide()
    }
  })
}
