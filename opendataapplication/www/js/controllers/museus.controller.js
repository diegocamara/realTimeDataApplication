angular.module('opendataapplication').controller('museusController', function($scope, $state, $timeout, $ionicLoading, ionicMaterialInk,
    ionicMaterialMotion, $ionicScrollDelegate, restService){

  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);

  $scope.page = 0;
  $scope.pageSize = 20;
  $scope.numeroDeRegistros = 0;
  $scope.places = [];
  $scope.isExibirMensagemNenhumResultadoEncontrado = false;
  $scope.mansagemNenhumResultadoEncontrado = "Não foram encontrados lugares para ";
  $scope.isInSearch = false;
  $scope.isShowFabMapButton = false;


  $scope.scrollTop = function(){
    $ionicScrollDelegate.scrollTop();
  }

  $scope.$on('$ionicView.afterEnter', function(){
    $scope.loadMore = function () {
      carregarMuseus($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService);
    }
  });

  $scope.goToProfile = function(p){
    $state.go('mainscreen.museuProfile', {place: p});
  }

  moreDataCanBeLoad($scope);
  inputFocus($scope, $timeout);

  var dataModel = {
    filter:'',
    consulta: function(){
    return restService.obterHoteisPorNome($scope, this.filter);
  }}

  inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-ripple', dataModel);

  moveFab($scope, $timeout, 'fab');
  motionFab($scope, $timeout, 'motion');

  $scope.$on('$ionicView.loaded', function(){
    $scope.isShowFabMapButton = true;
    $scope.motionFab('motion');
  });

})
