angular.module('starter.controllers', [])
  .controller('HomeCtrl', HomeCtrl)
  .controller('SearchCtrl', SearchCtrl)
  .controller('PostCtrl', PostCtrl)
  .controller('NotificationsCtrl', NotificationsCtrl)
  .controller('ProfileCtrl', ProfileCtrl)


function HomeCtrl(){
  var vm = this
  vm.title = "This is the home ctrl title"
}

function SearchCtrl(){
}

function PostCtrl(){
}

function NotificationsCtrl(){}

function ProfileCtrl(userService){}
