angular.module('opendataapplication').controller('centroDeComprasController', function($scope, $ionicLoading, $timeout, $state, ionicMaterialInk, ionicMaterialMotion, restService){

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

  $scope.loadMore = function () {
    caregarCentroDeCompras($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService);
  }

  $scope.goToProfile = function(p){
    $state.go('mainscreen.centroDeComprasProfile', {place: p});
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
