angular.module('opendataapplication').controller('teatrosController', function($scope, $state, $timeout, $ionicLoading, ionicMaterialInk,
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

      $scope.loadMore = function () {
        caregarTeatros($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService);
      }

      $scope.goToProfile = function(p){
        $state.go('mainscreen.teatroProfile', {place: p});
      }

      moreDataCanBeLoad($scope);

      moveFab($scope, $timeout, 'fab');
      motionFab($scope, $timeout, 'motion');

      $scope.$on('$ionicView.loaded', function(){
        $scope.isShowFabMapButton = true;
        $scope.motionFab('motion');
      });

})