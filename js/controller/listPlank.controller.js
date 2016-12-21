(function() {
  'use strict';

  angular
  .module('app.listPlank')
  .controller('ListPlankCtrl', ListPlankCtrl);

  ListPlankCtrl.$inject = ['dataPlankService','$state','dataCardsService']

  function ListPlankCtrl(dataPlankService,$state,dataCardsService) {
    var vm = this;



    activate();

    //activation and obtaining the desired sheet
    function activate() {
      console.log('List Plank Controller activated');
      vm.nameList = dataPlankService.getListName();
      vm.infoUser = dataPlankService.getInfoUser();
      vm.plankList = dataPlankService.getListPlanks();
      vm.dataCards = dataCardsService.getListCards();
    }

    vm.addPlank = function(){
      if (vm.plankText) {
        dataPlankService.addPlank(vm.plankText);
        vm.plankText = '';
      }
    }

    vm.category = function(){
      for (var obj in vm.nameList) {
        if(vm.nameList[obj].name == vm.selected){
          vm.plankList = dataPlankService.getListPlank(vm.nameList[obj].plankList);
          break;
        }
      }
    }

    vm.SignIn = function() {
      dataPlankService.getAuth(vm.email, vm.password);
      vm.infoUser = dataPlankService.getInfoUser();
      if (vm.infoUser.name) {
        $state.go('planks');
        vm.plankList = dataPlankService.getListPlanks();
      } else {
        alert("Неверный логин или пароль");
      }
    }

    vm.openPlank = function(index) {
      dataPlankService.getIdCards(index);
      vm.dataCards = dataCardsService.getListCards();
      console.log(vm.dataCards);
      $state.go('cards');
    }

    vm.addCardList = function() {
      if (vm.cardsText) {
        dataCardsService.addCards(vm.cardsText);
        vm.cardsText = '';
      }
    }
    vm.addCard_m = function(index) {
        if (vm.m_cardsText) {
        dataCardsService.addCard_m(index,vm.m_cardsText);
        vm.m_cardsText='';
      }
    }

  }
})();
