angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {
  
})

.controller('SearchCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  //
  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
})

.controller('PostCtrl', function($scope) {
  // $scope.chat = Chats.get($stateParams.chatId);
})

.controller('NotificationsCtrl', function($scope) {
  // $scope.settings = {
  //   enableFriends: true
  // }
})

.controller('ProfileCtrl', function($scope){

})
