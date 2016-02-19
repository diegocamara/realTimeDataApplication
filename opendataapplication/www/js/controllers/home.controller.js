angular.module('opendataapplication').controller('homeController', function($timeout, $scope, $state, $http, ionicMaterialInk, ionicMaterialMotion, $ionicLoading, restService){

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    executarLoadingIndicator($scope, $ionicLoading);

    carregarCategorias($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading);

  $scope.goToCategory = function (local) {
      $state.go('mainscreen.' + local);
  }


  ionicMaterialInk.displayEffect();


})
