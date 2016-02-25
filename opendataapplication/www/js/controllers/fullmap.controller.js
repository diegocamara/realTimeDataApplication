angular.module('opendataapplication').controller('fullmapController', function($scope, $stateParams, $timeout, $state, $ionicHistory){

  $scope.place = $stateParams.place;
  $scope.categoria = $stateParams.categoria;

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

  $scope.goToProfile = function(p){
    $ionicHistory.goBack();
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

    var iconColor = getIconColor($scope.categoria);

    var icon = iconColor.icon;
    var makerColor = iconColor.color;

    awesomeMarkerIcon = {
            type: 'awesomeMarker',
            icon: icon,
            markerColor: makerColor
        }

    $scope.map.markers = [{
      lat: $scope.place.latitude,
      lng: $scope.place.longitude,
      message: $scope.place.nome,
      focus: true,
      icon: awesomeMarkerIcon,
      draggable: false
    }]

  });


});
