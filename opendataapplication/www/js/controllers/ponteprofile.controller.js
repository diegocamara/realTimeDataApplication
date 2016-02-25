angular.module('opendataapplication').controller('ponteProfileController', function($scope, $stateParams){

  $scope.place = $stateParams.place;
  $scope.$on('$stateChangeSuccess', function(){

        $scope.map = {
          defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          maxZoom: 15,
          zoomControlPosition: 'bottomleft'
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
          zoom: 15
        }

        var iconColor = getIconColor('pontes');

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

  })

  $scope.isLocalizacaoDisponivel = function(){
    return $scope.place != null && $scope.place.latitude != null && $scope.place.longitude != null;
  }

})
