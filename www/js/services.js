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

  function index(){
    return $http.get('/users')
  }
  function show(id){
    return $http.get('/users/' + id)
  }
  function create(data){
    return $http.post('/users', data)
  }
  function update(id, data){
    return $http.patch('/users/' + id, data)
  }
  function destroy(id){
    return $http.delete('/users/' + id)
  }
}
