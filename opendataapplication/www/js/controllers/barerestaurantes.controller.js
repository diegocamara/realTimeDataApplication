angular.module('opendataapplication.controllers').controller('baresERestaurantesController', function ($scope, $timeout, $state, $ionicLoading, ionicMaterialInk,
    ionicMaterialMotion, $ionicScrollDelegate, restService) {

      // $timeout(function () {
      //   $scope.isExpanded = true;
      //   $scope.$parent.setExpanded(true);
      // }, 100);

    $scope.page = 0;
    $scope.pageSize = 20;
    $scope.numeroDeRegistros = 0;
    $scope.places = [];
    $scope.isExibirMensagemNenhumResultadoEncontrado = false;
    $scope.mansagemNenhumResultadoEncontrado = "Não foram encontrados lugares para ";
    $scope.isInSearch = false;

    $scope.scrollTop = function(){
      $ionicScrollDelegate.scrollTop();
    }

    $scope.loadMore = function () {
        carregarBarERes($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion);
    }

    $scope.goToProfile = function(p){
      $state.go('mainscreen.restauranteProfile', {place: p});
    }

    moreDataCanBeLoad($scope);
    inputFocus($scope, $timeout);

    var dataModel = {
      filter:'',
      consulta: function(){
      return restService.obterBareResPorNome($scope, this.filter);
    }}

    inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-fade-slide-in', dataModel);

})
