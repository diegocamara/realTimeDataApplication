

var modulo = angular.module('opendataapplication');

modulo.controller('appController', function($timeout, $rootScope, $scope, $http, ionicMaterialInk, ionicMaterialMotion, $ionicHistory){

    $rootScope.isExibirSearchBar = false;

    //////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderisExibirLupaFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

})

.controller('homeController', function($timeout, $scope, $state, $http, ionicMaterialInk, ionicMaterialMotion, $ionicLoading, restService){


  //$scope.$parent.showHeader();
  //$scope.$parent.clearFabs();
  //$scope.$parent.setHeaderFab('center');

  // $timeout(function () {
  //   $scope.isExpanded = true;
  //   $scope.$parent.setExpanded(true);
  // }, 100);

  //ionicMaterialMotion.fadeSlideInRight();

  executarLoadingIndicator($scope, $ionicLoading);

  carregarCategorias($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading);

  // carregarCategorias($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading);


  $scope.goToCategory = function (local) {
      $state.go('mainscreen.' + local);
  }

  ionicMaterialInk.displayEffect();


})

.controller('mapController', ['$scope',
                              'leafletData',
                              '$cordovaGeolocation',
                              '$timeout',
                              function($scope,
                                       leafletData,
                                       $cordovaGeolocation,
                                       $timeout){

  $timeout(function () {
          $scope.isHideNavbar = true;
  }, 100);


  $scope.map = {};

  var options = {timeout: 10000, enableHighAccuracy:true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    $scope.map.center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      zoom: 20
    }

  }, function(error){
    console.log("Could not get location");
  });

}])

.controller('baresERestaurantesController', function ($scope, $timeout, ionicMaterialInk,
    ionicMaterialMotion, restService) {

    $scope.isExibirSearchBar = false;
    $scope.filter = "";
    $scope.page = 0;
    $scope.pageSize = 5;
    $scope.numeroDeRegistros = 0;
    $scope.places = [];

    $scope.loadMore = function () {
        carregarBarERes($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion);
    }

    $scope.moreDataCanBeLoad = function () {
        return $scope.places.length <= $scope.numeroDeRegistros;
    }

    $scope.GotoLink = function (url) {
        window.open(url, '_system');
    }

    $scope.showSearchbar = function(){
      $scope.isExibirSearchBar = true;

      $timeout(function () {
        var input = document.getElementById('inputId');
        input.focus();
      }, 100);

    }

    $scope.hideSearchBar = function(){
      $scope.isExibirSearchBar = false;    
    }

    // ionicMaterialInk.displayEffect();

    // $scope.$on('$stateChangeSuccess', function(){
    //   $scope.loadMore();
    // });

});


// var angularApp = angular.module('opendataapplication');
//
// angularApp.controller('mapController', ['$scope',
//                                         'leafletData',
//                                         '$cordovaGeolocation',
//                                         '$timeout',
//                                         function($scope, leafletData, $cordovaGeolocation, $timeout){
//
//   $timeout(function () {
//           $scope.isHideNavbar = true;
//   }, 100);
//
//
//   $scope.map = {};
//
//   var options = {timeout: 10000, enableHighAccuracy:true};
//
//   $cordovaGeolocation.getCurrentPosition(options).then(function(position){
//
//     $scope.map.center = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//       zoom: 20
//     }
//
//   }, function(error){
//     console.log("Could not get location");
//   });
//
// }]);

function executarLoadingIndicator($scope, $ionicLoading) {
    $scope.loadingIndicator = $ionicLoading.show({
        template: '<ion-spinner icon="android"/></p>',
        animation: 'fade-in',
        showBackdrop: false,
        showDelay: 0
    });
}

function carregarCategorias($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading) {
    var categories = restService.obterCategorias();
    categories.then(function (response) {
        $scope.categorias = response;
        $scope.loadingIndicator = $ionicLoading.hide();
        aplicarEfeitoBlinds($timeout, ionicMaterialInk, ionicMaterialMotion, 200);
    })
}

function carregarBarERes($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    var barERelDataModel = restService.obterBareRes($scope, $scope.page, $scope.pageSize);
    barERelDataModel.then(function (response) {
        carregarLugaresComVelocidade($scope, $timeout, response, 500);
    })
}

function carregarLugaresComVelocidade($scope, $timeout, response, velocidade) {
    var place = 0;
    carregarLugares($scope, $timeout, response, place, velocidade);
}

function carregarLugares($scope, $timeout, response, place, velocidade) {
    $timeout(function () {

        response[place].isExisteSite = isExisteSite(response[place].site);
        $scope.places.push(response[place]);
        place++;
        if (place < response.length) {
            carregarLugares($scope, $timeout, response, place, velocidade);
        } else {
            $scope.page += 1;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    }, velocidade);
}

function aplicarEfeitoBlinds($timeout, ionicMaterialInk, ionicMaterialMotion, tempoDeEspera) {
    $timeout(function () {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.blinds();
    }, tempoDeEspera);
}

function isExisteSite(str){
  return str != undefined && str.match(/[a-z]/i);
}

function redirecionar(path) {
    $location.path(path);
};
