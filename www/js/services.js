angular.module('starter.services', [])
.factory('userService', userService)
.factory('relationService', relationService)
.factory('productService', productService)
.factory('likeService', likeService)
.factory('commentService', commentService)
.factory('categoryService', categoryService)
.factory('reviewService', reviewService)

function userService($http){
  // https://stark-wave-90063.herokuapp.com
  // https://git.heroku.com/stark-wave-90063.git

  // https://stark-wave-90063.herokuapp.com/
  var apiUrl = 'https://stark-wave-90063.herokuapp.com/users/'

  var service = {
    index: index,
    show: show,
    create: create,
    delete: destroy,
    update: update,
  }
  return service

  function index(){
    return $http.get(apiUrl)
  }
  function show(id){
    return $http.get(apiUrl + id)
  }
  function create(data){
    return $http.post(apiUrl, data)
  }
  function update(id, data){
    return $http.patch(apiUrl + id, data)
  }
  function destroy(id){
    return $http.delete(apiUrl + id)
  }
}
function relationService($http){

  var apiUrl = 'https://stark-wave-90063.herokuapp.com/relations/'
  var service = {
    create: create,
    delete: destroy,
    show: show
  }
  return service

  function create(data){
    return $http.post(apiUrl, data)
  }
  function destroy(id){
    return $http.delete(apiUrl + id)
  }
  function show(id){
    return $http.get(apiUrl + id)
  }
}

function productService($http){

  var apiUrl = 'https://stark-wave-90063.herokuapp.com/products/'

  var service = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
  }
  return service

  function index(){
    return $http.get(apiUrl)
  }
  function show(id){
    return $http.get(apiUrl + id)
  }
  function create(data){
    return $http.post(apiUrl, data)
  }
  function update(id, data) {
    return $http.patch(apiUrl + id, data)
  }
  function destroy(id){
    return $http.delete(apiUrl + id)
  }
}

function likeService($http){

  var apiUrl = 'https://stark-wave-90063.herokuapp.com/likes/'
  var service = {
    create: create,
    delete: destroy
  }
  return service

  function create(data){
    return $http.post(apiUrl, data)
  }
  function destroy(id){
    return $http.delete(apiUrl + id)
  }
}

function commentService($http){

  var apiUrl = 'https://stark-wave-90063.herokuapp.com/comments/'

  var service = {
    index: index,
    create: create,
    update: update,
    delete: destroy,
  }
  return service

  function index(){
    return $http.get(apiUrl)
  }
  function create(data){
    return $http.post(apiUrl, data)
  }
  function update(id, data){
    return $http.patch(apiUrl + id, data)
  }
  function destroy(id){
    return $http.delete(apiUrl + id)
  }
}

function categoryService($http){

  var apiUrl = 'https://stark-wave-90063.herokuapp.com/category/'

  var service = {
    index: index,
    create: create,
    show: show,
    update: update,
    delete: destroy
  }
  return service

  function index(){
    return $http.get(apiUrl)
  }
  function show(id){
    return $http.get(apiUrl + id)
  }
  function create(data){
    return $http.post(apiUrl, data)
  }
  function update(id, data){
    return $http.patch(apiUrl + id, data)
  }
  function destroy(id){
    return $http.delete(apiUrl + id)
  }
}

function reviewService($http){

  var apiUrl = 'https://stark-wave-90063.herokuapp.com/reviews/'

  var service = {
    create: create,
    delete: destroy
  }
  return service

  function create(data){
    return $http.post(apiUrl, data)
  }
  function destroy(id){
    return $http.delete(apiUrl + id)
  }
}
