angular.module('opendataapplication').controller('feiraslivresController', function($scope, $ionicLoading, $timeout, $state, ionicMaterialInk, ionicMaterialMotion, restService){

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
      carregarFeirasLivres($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService);
    }

  });



  $scope.goToProfile = function(p){
    $state.go('mainscreen.informacaoFeiraLivre', {place:p});
  }

  moreDataCanBeLoad($scope);
  inputFocus($scope, $timeout);

  var dataModel = {
    filter:'',
    consulta: function(){
    return restService.obterHoteisPorNome($scope, this.filter);
  }}

  inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-blinds', dataModel);

  moveFab($scope, $timeout, 'fab');
  motionFab($scope, $timeout, 'motion');

  $scope.$on('$ionicView.loaded', function(){
    $scope.isShowFabMapButton = true;
    $scope.motionFab('motion');
  });

})
