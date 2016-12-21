(function() {
  'use strict';

  angular
  .module('app.router')
  .config(function($stateProvider) {

    var planks = {
      name: 'planks',
      url: '/planks.html',
      templateUrl: '/html/planks.html'
    }
    var login = {
      name: 'login',
      url: '/login.html',
      templateUrl: '/html/login.html'
    }
    var cards = {
      name: 'cards',
      url: '/cards.html',
      templateUrl: '/html/cards.html'
    }

  $stateProvider.state(planks);
  $stateProvider.state(login);
  $stateProvider.state(cards);





});
})();
