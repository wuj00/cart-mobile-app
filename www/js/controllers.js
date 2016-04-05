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
