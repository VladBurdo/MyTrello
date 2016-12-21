(function() {
  'use strict';

  angular
  .module('app.dataPlank')
  .factory('dataPlankService', DataPlankService);

  DataPlankService.$inject = ['$http', '$q','$firebaseArray','$window']

  function DataPlankService($http, $q, $firebaseArray, $window) {
    var vm = this;

    var ref = new Firebase("https://vladmytrello.firebaseio.com/NameList");
    var _listName = $firebaseArray(ref);

    var service = {
      getListPlanks: getListPlanks,
      getListName: getListName,
      getInfoUser: getInfoUser,
      addPlank: addPlank,
      addName: addName,
      getAuth: getAuth,
      setLocalItem: setLocalItem,
      getLocalItem: getLocalItem,
      getIdCards: getIdCards
    };
    return service;

    function getLocalItem(what) {
      return $window.localStorage && $window.localStorage.getItem(what);
    }

    function setLocalItem(what, value) {
      return $window.localStorage && $window.localStorage.setItem(what,value);
    }


    function getAuth(email, password) {
      setLocalItem('my-storageName', "");
      setLocalItem('my-storagePlank', "");
      _listName.forEach(function(item) {
         if(item.email == email && item.password == password){
           setLocalItem('my-storageName', item.name);
           setLocalItem('my-storagePlank', item.plankList);
         };
      });
    }

    function getListPlanks() {
      if(getLocalItem('my-storagePlank')){
        var ref = new Firebase(getLocalItem('my-storagePlank'));
        vm._listPlanks = $firebaseArray(ref);
        return vm._listPlanks;
      }
    }

    function getInfoUser(value) {
      return {
        name: getLocalItem('my-storageName'),
        plankList: getLocalItem('my-storagePlank')
      }
    }

    function getListName() {
      return _listName;
    }

    function addPlank(value) {
      vm._listPlanks.$add({
        plankName: value
      });
    }

    function addName(value) {
      _listName.push(value);
    }

    function getListCards(index) {
      setLocalItem('my-storageName', index);
      return vm._listPlanks[index];
    }

    function getIdCards(index) {
      var val = vm._listPlanks[index];
      setLocalItem('my-storageIdCards', val.$id);
      return val.$id;
    }

  }
})();
