angular.module('starter.services', [])
.factory('userService', userService)
.factory('relationService', relationService)
.factory('productService', productService)
.factory('likeService', likeService)
.factory('commentService', commentService)
.factory('categoryService', categoryService)
.factory('reviewService', reviewService)

function userService($http){
  var service = {
    index: index,
    show: show,
    create: create,
    delete: destroy,
    update: update,
  }
  return service

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
function relationService($http){
  var service = {
    create: create,
    delete: destroy
  }
  return service

  function create(data){
    return $http.post('/relations', data)
  }
  function destroy(id){
    return $http.delete('/relations/' + id)
  }
}

function productService($http){
  var service = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
  }
  return service

  function index(){
    return $http.get('/products')
  }
  function show(id){
    return $http.get('/products/' + id)
  }
  function create(data){
    return $http.post('/products', data)
  }
  function update(id, data) {
    return $http.patch('/users/' + id, data)
  }
  function destroy(id){
    return $http.delete('/users/' + id)
  }
}

function likeService($http){
  var service = {
    create: create,
    delete: destroy
  }
  return service

  function create(data){
    return $http.post('/likes/', data)
  }
  function destroy(id){
    return $http.delete('/likes/' + id)
  }
}

function commentService($http){
  var service = {
    index: index,
    create: create,
    update: update,
    delete: destroy,
  }
  return service

  function index(){
    return $http.get('/comments')
  }
  function create(data){
    return $http.post('/comments', data)
  }
  function update(id, data){
    return $http.patch('/comments/' + id, data)
  }
  function destroy(id){
    return $http.delete('/comments/' + id)
  }
}

function categoryService($http){
  var service = {
    index: index,
    create: create,
    show: show,
    update: update,
    delete: destroy
  }
  return service

  function index(){
    return $http.get('/category')
  }
  function show(id){
    return $http.get('/category/' + id)
  }
  function create(data){
    return $http.post('/category', data)
  }
  function update(id, data){
    return $http.patch('/category/' + id, data)
  }
  function destroy(id){
    return $http.delete('/category/' + id)
  }
}

function reviewService($http){
  var service = {
    create: create,
    delete: destroy
  }
  return service
  
  function create(data){
    return $http.post('/reviews/', data)
  }
  function destroy(id){
    return $http.delete('/reviews/' + id)
  }
}
