angular.module('opendataapplication').controller('fullmapController', function($scope, $stateParams, $timeout, $state, $ionicPlatform){

  $scope.place = $stateParams.place;


    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

  $scope.goToProfile = function(p){
    $state.go('mainscreen.centroDeComprasProfile', {place:p});
  }

  $scope.$on('$ionicView.beforeLeave', function(){
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
  });

  $scope.$on('$stateChangeSuccess', function(){

    $scope.map = {
      defaults: {
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoomControlPosition: 'bottomright',
      scrollWheelZoom: true
    },
    markers : {},
    events: {
      map: {
        enable: ['context'],
        logic: 'emit'
      }
    }};

    $scope.map.center = {
      lat: $scope.place.latitude,
      lng: $scope.place.longitude,
      zoom: 20
    }

    $scope.map.markers = [{
      lat: $scope.place.latitude,
      lng: $scope.place.longitude,
      message: $scope.place.nome,
      focus: true,
      draggable: false
    }]

  });


});
