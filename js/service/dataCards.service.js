(function() {
  'use strict';

  angular
  .module('app.dataCards')
  .factory('dataCardsService', DataCardsService);

  DataCardsService.$inject = ['$http', '$q','$firebaseArray','$window','dataPlankService']

  function DataCardsService($http, $q, $firebaseArray, $window, dataPlankService) {
    var vm = this;

    var service = {
      getListCards: getListCards,
      addCards: addCards,
      addCard_m: addCard_m
    };
    return service;


    function getListCards(index) {
      if(dataPlankService.getLocalItem('my-storagePlank')){
        vm.list = dataPlankService.getLocalItem('my-storagePlank')+"/"+dataPlankService.getLocalItem('my-storageIdCards')+"/list";
        var ref = new Firebase(vm.list);
        vm._listCards = $firebaseArray(ref);
        return vm._listCards;
      }
    }

    function addCards(value) {
      vm._listCards.$add({
        nameList: value
      });
    }
    function addCard_m(index, value) {
      var val = vm._listCards[index];
      var fgh = vm.list+"/"+val.$id+"/card"
      var ref = new Firebase(fgh);
      var Cards = $firebaseArray(ref);
      Cards.$add({
        content: value
      });
    }

  }
})();
