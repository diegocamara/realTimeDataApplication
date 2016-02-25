angular.module('opendataapplication').controller('homeController', function($timeout, $scope, $state,
                                                                            $http, ionicMaterialInk,
                                                                            ionicMaterialMotion, $ionicLoading,
                                                                            $ionicNavBarDelegate, restService){


                  $scope.$on('$ionicView.afterEnter', function(){

                    $timeout(function () {
                      $ionicNavBarDelegate.align('center');
                    });

                  });




    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    executarLoadingIndicator($scope, $ionicLoading);

    $scope.$on('$ionicView.loaded', function(){
      carregarCategorias($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading);
    });


    $scope.goToCategory = function (local) {
        $state.go('mainscreen.' + local);
    }


    ionicMaterialInk.displayEffect();


})
