angular.module('opendataapplication').controller('fullmapController', function($scope, $stateParams, $timeout, $state){

  $scope.place = $stateParams.place;  

  $timeout(function () {
    $scope.$parent.hideHeader();
  }, 10);

  $scope.goToProfile = function(p){
    $state.go('mainscreen.centroDeComprasProfile', {place:p});
    $timeout(function () {
      $scope.$parent.showHeader();
    }, 10);
  }

  $scope.$on('$stateChangeSuccess', function(){

    $scope.map = {
      defaults: {
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoomControlPosition: 'bottomright'
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
