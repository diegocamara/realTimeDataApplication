angular.module('opendataapplication.controllers').controller('mapController', ['$scope',
                              'leafletData',
                              '$cordovaGeolocation',
                              '$timeout',
                              'restService',
                              '$ionicLoading',
                              '$state',
                              '$stateParams',
                              function($scope,
                                       leafletData,
                                       $cordovaGeolocation,
                                       $timeout,
                                       restService,
                                       $ionicLoading,
                                       $state,
                                       $stateParams){

  var categoria = $stateParams.categoria;

  $scope.map;

  executarLoadingIndicator($scope, $ionicLoading);

  $scope.$on('$stateChangeSuccess', function(){

        $scope.map = {
          defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          maxZoom: 12,
          zoomControlPosition: 'bottomleft'
        },
        markers : {},
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }};

        $scope.map.markers = [];

        restService.obterTodosRegistros(categoria).then(function(markers){

          if(markers != 'undefined' && markers != null){

            for (var place = 0; place < markers.length; place++){
              if(markers[place].latitude != null && markers[place].longitude != null){

                var marker = {
                    lat: markers[place].latitude,
                    lng: markers[place].longitude,
                    message: markers[place].nome,
                    draggable: false
                }

                $scope.map.markers.push(marker);

              }

            }

            var place = {
              name: "Recife - PE",
              latitude: -8.0564394,
              longitude: -34.9221501,
              zoom: 12
            }

            $scope.map.center = {
              lat: place.latitude,
              lng: place.longitude,
              zoom: place.zoom
            }

          }

            $scope.loadingIndicator = $ionicLoading.hide();

        });


        $scope.getCurrentPosition = function(){

          var options = {timeout: 10000, enableHighAccuracy:true};

          $cordovaGeolocation.getCurrentPosition(options).then(function(position){

            $scope.map.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              zoom: 12
            }




            awesomeMarkerIcon = {
                    type: 'awesomeMarker',
                    icon: 'icon ion-social-tux',
                    markerColor: 'red'
                }




            var marker = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        message: 'Here are you baby!',
                        getMessageScope: function() {return $scope; },
                        getLabelScope: function() { return $scope },
                        focus: true,
                        icon: awesomeMarkerIcon,
                        label: {
                            message: '<button ng-click="var2 = var2 + 1">Say Hello</button>',
                            options: {
                                noHide: true,
                                className : "class1"
                            }

                        }
                    }


            $scope.map.markers.push(marker);


          }, function(error){
            console.log("Could not get location");
          });

        }






  });





}])
