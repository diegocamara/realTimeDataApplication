angular.module('opendataapplication').controller('centroDeComprasProfileController', function($scope, $state,  $stateParams, $timeout){

  $scope.place = $stateParams.place;

  $scope.isLocalizacaoDisponivel = function(){
    return $scope.place != null && $scope.place.latitude != null && $scope.place.longitude != null;
  }

  $scope.$on('$stateChangeSuccess', function(){

    $scope.map = {
      defaults: {
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      maxZoom: 15,
      dragging: false,
      zoomControl: false,
      tap: false
    },
    markers : {},
    events: {
      map: {
        enable: ['context'],
        logic: 'emit'
      }
    }};

    $scope.$on('leafletDirectiveMap.map.click', function(event){
      $state.go('mainscreen.fullmap', {place: $scope.place});
    });

    $scope.map.center = {
      lat: $scope.place.latitude,
      lng: $scope.place.longitude,
      zoom: 15
    }

    $scope.map.markers = [{
      lat: $scope.place.latitude,
      lng: $scope.place.longitude,
      message: $scope.place.nome,
      focus: true,
      draggable: false
    }]

  });

})
