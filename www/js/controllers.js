angular.module('starter.controllers', [])
  .controller('HomeCtrl', HomeCtrl)
  .controller('SearchCtrl', SearchCtrl)
  .controller('PostCtrl', PostCtrl)
  .controller('NotificationsCtrl', NotificationsCtrl)
  .controller('ProfileCtrl', ProfileCtrl)


function HomeCtrl(){
  var self = this
  self.title = "This is the home ctrl title"
}

function SearchCtrl(){
  var self = this
  self.title = "Search Ctrl title"
}

function PostCtrl(){
  var self = this
  self.title = "Post Ctrl yeah"
}

function NotificationsCtrl(){
  var self = this
  self.title = "Notifications Ctrl yup"
}

function ProfileCtrl(){
  var self = this
  self.title = "Profile Ctrl yes"
}
