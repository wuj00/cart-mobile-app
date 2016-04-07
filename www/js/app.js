// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('PostCtrl', function($scope, $ionicSlideBoxDelegate){
    $scope.navSlide = function(index) {
        $ionicSlideBoxDelegate.slide(index, 500)
    }
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login-detail.html'
  })

  .state('register', {
    url: '/new',
    templateUrl: 'templates/signup-detail.html'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.newsFeed-user', {
    url: '/newsFeed/:user',
    views: {
      'tab-newsFeed-user': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl as hc'
      }
    }
  })

  .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl as sc'
        }
      }
    })
    .state('tab.post-user', {
      url: '/post/:user',
      views: {
        'tab-post-user': {
          templateUrl: 'templates/tab-post.html',
          controller: 'PostCtrl as pc'
        }
      }
    })

  .state('tab.notifications-user', {
    url: '/notifications/:user',
    views: {
      'tab-notifications-user': {
        templateUrl: 'templates/tab-notifications.html',
        controller: 'NotificationsCtrl as nc'
      }
    }
  })
  .state('tab.profile-user', {
    url: '/profile/:user',
    views: {
      'tab-profile-user': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl as pc'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
