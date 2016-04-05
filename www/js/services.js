angular.module('starter.services', [])
.factory('userService', userService)

function userService($http){
  var service = {
    index: index,
    show: show,
    create: create,
    delete: destroy,
    update: update,
  }

  function index($http){
    $http({
      method: "GET",
      url: '/users'
    }).then(function success(res){
      console.log("Success");
    }), function error(res){
      console.log("Error");
    }
  }
  function show($http){
    $http({
      method: "GET",
      url: "/users/:id"
    }).then(function success(res){

    })
  }
}
