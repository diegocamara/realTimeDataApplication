

var modulo = angular.module('opendataapplication');

modulo.controller('appController', function($timeout, $rootScope, $scope, $http, ionicMaterialInk, ionicMaterialMotion, $ionicHistory){

   $scope.isExpanded = false;
   $scope.hasHeaderFabLeft = false;
   $scope.hasHeaderFabRight = false;

   var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

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

    $scope.setHeaderFab = function(location) {
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

.controller('mapController', ['$scope',
                              'leafletData',
                              '$cordovaGeolocation',
                              '$timeout',
                              'restService',
                              '$ionicLoading',
                              '$state',
                              function($scope,
                                       leafletData,
                                       $cordovaGeolocation,
                                       $timeout,
                                       restService,
                                       $ionicLoading,
                                       $state){

  $scope.goToProfile = function(p){
    $state.go('mainscreen.hotelProfile', {place: p});
  }

  $scope.$on('leafletDirectiveMap.popupopen', function(event, leafletEvent){
    console.log(event);
  // Create the popup view when is opened
  //var feature = leafletEvent.leafletEvent.popup.options.feature;

  //var newScope = $scope.$new();
  //newScope.stream = feature;

  //$compile(leafletEvent.leafletEvent.popup._contentNode)(newScope);
});

  executarLoadingIndicator($scope, $ionicLoading);

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

        $scope.map.markers = [];

        restService.obterTodosRegistros().then(function(markers){

          if(markers != 'undefined' && markers != null){

            for(var place = 0; place < markers.length; place++){
              if(markers[place].latitude != null && markers[place].longitude != null){

                var placeString = '\"mainscreen.hotelProfile\(\place:{nome:'+ markers[place].nome + ',' +
                'telefone:' + markers[place].telefone + ',' +
                'site:' + markers[place].site + ',' +
                'latitude:' + markers[place].latitude + ',' +
                'longitude:' + markers[place].longitude +
                '\}\)\"';

                var html = markers[place].nome +
                          '<center><a class="button button-icon icon ion-ios-information" ui-sref=""></a></center>';

                var marker = {
                    lat: markers[place].latitude,
                    lng: markers[place].longitude,
                    message: html,
                    draggable: false
                }

                $scope.map.markers.push(marker);

              }

            }



            var place = {
              name: "Recife - PE",
              latitude: -8.0611257,
              longitude: -34.8949907,
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



        /*
        var options = {timeout: 10000, enableHighAccuracy:true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        }, function(error){
          console.log("Could not get location");
        });
        */


  });





}])

.controller('baresERestaurantesController', function ($scope, $timeout, $ionicLoading, ionicMaterialInk,
    ionicMaterialMotion, $ionicScrollDelegate, restService) {

      // $timeout(function () {
      //   $scope.isExpanded = true;
      //   $scope.$parent.setExpanded(true);
      // }, 100);

    $scope.page = 0;
    $scope.pageSize = 20;
    $scope.numeroDeRegistros = 0;
    $scope.places = [];
    $scope.isExibirMensagemNenhumResultadoEncontrado = false;
    $scope.mansagemNenhumResultadoEncontrado = "Não foram encontrados lugares para ";
    $scope.isInSearch = false;

    $scope.scrollTop = function(){
      $ionicScrollDelegate.scrollTop();
    }

    $scope.loadMore = function () {
        carregarBarERes($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion);
    }

    $scope.moreDataCanBeLoad = function () {
      var moreDataCanBeLoad = false;
      if(!$scope.isInSearch){
          moreDataCanBeLoad = $scope.places.length <= $scope.numeroDeRegistros;
      }
      return moreDataCanBeLoad;
    }

    $scope.GotoLink = function (url) {
        window.open(url, '_system');
    }


    $scope.inputFocus = function(searchBarShow){

      if(!searchBarShow){
        $scope.isInSearch = true;
        $timeout(function () {
          var input = document.getElementById('inputId');
          input.focus();
        }, 100);
      }else{
        $scope.scrollTop();
        $scope.isInSearch = false;
        $scope.page = 0;
        $scope.pageSize = 20;
        $scope.numeroDeRegistros = 0;
        $scope.places = [];
        $scope.loadMore();
      }

    }

    $scope.hideSearchBar = function(){
      $scope.places = [];
    }

    $scope.togglePlace = function(place){

      if($scope.isShowPlace(place)){
        $scope.selectedPlace = null;
      }else{
        $scope.selectedPlace = place;
      }

    }

    $scope.isShowPlace = function(place){
      return $scope.selectedPlace === place;
    }

    var timeoutDelay;

    $scope.inputChange = function(filter){
      $scope.isExibirMensagemNenhumResultadoEncontrado = false;
      $scope.scrollTop();
      if(filter !== ''){

          if(timeoutDelay){
            $timeout.cancel(timeoutDelay);
          }

          executarLoadingIndicator($scope, $ionicLoading);

          timeoutDelay = $timeout(function () {

            var bareserestaurantes = restService.obterBareResPorNome($scope, filter);

            bareserestaurantes.then(function(places){

              $scope.places = places;

              if(typeof $scope.places !== 'undefined' && $scope.places !== null){

                if($scope.places.length > 0){
                  $scope.numeroDeRegistros = $scope.places.length + 1;
                  $timeout(function () {
                    ionicMaterialMotion.fadeSlideIn({startVelocity: 400});
                    ionicMaterialInk.displayEffect();
                    $scope.loadingIndicator = $ionicLoading.hide();
                  }, 50);

                }else{
                  $scope.numeroDeRegistros = 0;
                  $scope.isExibirMensagemNenhumResultadoEncontrado = true;
                  $scope.mansagemNenhumResultadoEncontrado += filter;
                  $scope.loadingIndicator = $ionicLoading.hide();

                }

              }

            });

          }, 1000);

      }else{
        $scope.loadingIndicator = $ionicLoading.hide();
      }

    }


})
.controller('hoteisController', function($scope, $state, $timeout, $ionicLoading, ionicMaterialInk,
    ionicMaterialMotion, $ionicScrollDelegate, restService){

      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.$parent.setHeaderFab('right');

      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);

      $scope.page = 0;
      $scope.pageSize = 20;
      $scope.numeroDeRegistros = 0;
      $scope.places = [];
      $scope.isExibirMensagemNenhumResultadoEncontrado = false;
      $scope.mansagemNenhumResultadoEncontrado = "Não foram encontrados lugares para ";
      $scope.isInSearch = false;


      $scope.scrollTop = function(){
        $ionicScrollDelegate.scrollTop();
      }

      $scope.loadMore = function () {
        carregarHoteis($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion);
      }

      $scope.goToProfile = function(p){
        $state.go('mainscreen.hotelProfile', {place: p});
      }

      moreDataCanBeLoad($scope);
      inputFocus($scope, $timeout);

      var dataModel = {
        filter:'',
        consulta: function(){
        return restService.obterHoteisPorNome($scope, this.filter);
      }}

      inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-ripple', 400, dataModel);


})

.controller('hotelProfileController', ['$scope',
                                       '$stateParams',
                                       '$state',
                                       '$timeout',
                                       'ionicMaterialInk',
                                       'ionicMaterialMotion',
                                        function($scope,
                                                 $stateParams,
                                                 $state,
                                                 $timeout,
                                                 ionicMaterialInk,
                                                 ionicMaterialMotion){

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

        $scope.map.markers = [{
          lat: $scope.place.latitude,
          lng: $scope.place.longitude,
          message: $scope.place.nome,
          focus: true,
          draggable: false
        }]

        /*
        var options = {timeout: 10000, enableHighAccuracy:true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        }, function(error){
          console.log("Could not get location");
        });
        */


  });


  $scope.isLocalizacaoDisponivel = function(){
    return $scope.place != null && $scope.place.latitude != null && $scope.place.longitude != null;
  }


}]);

function showTogglePlace($scope){
  $scope.togglePlace = function(place){

    if($scope.isShowPlace(place)){
      $scope.selectedPlace = null;
    }else{
      $scope.selectedPlace = place;
    }

  }

  $scope.isShowPlace = function(place){
    return $scope.selectedPlace === place;
  }
}

function moreDataCanBeLoad($scope){

  $scope.moreDataCanBeLoad = function () {
    var moreDataCanBeLoad = false;
    if(!$scope.isInSearch){
        moreDataCanBeLoad = $scope.places.length <= $scope.numeroDeRegistros;
    }
    return moreDataCanBeLoad;
  }

}

function inputFocus($scope, $timeout){
  $scope.inputFocus = function(searchBarShow){
    if(!searchBarShow){
      $scope.isInSearch = true;
      $timeout(function () {
        var input = document.getElementById('inputId');
        input.focus();
      }, 100);
    }else{
      $scope.scrollTop();
      $scope.isInSearch = false;
      $scope.page = 0;
      $scope.pageSize = 20;
      $scope.numeroDeRegistros = 0;
      $scope.places = [];
      $scope.loadMore();
    }
  }
}


function inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, effect, effectVelocity, dataModel){

  var timeOutDelay;

  $scope.inputChange = function(filter){
    dataModel.filter = filter;
    $scope.isExibirMensagemNenhumResultadoEncontrado = false;
    $scope.scrollTop();
    if(dataModel.filter !== ''){

        if(timeOutDelay){
          $timeout.cancel(timeOutDelay);
        }

        executarLoadingIndicator($scope, $ionicLoading);

        timeOutDelay = $timeout(function () {

          if(dataModel !== 'undefined' && dataModel !== null){

            var data = dataModel.consulta();

            data.then(function(places){

              $scope.places = places;

              if(typeof $scope.places !== 'undefined' && $scope.places !== null){

                if($scope.places.length > 0){
                  $scope.numeroDeRegistros = $scope.places.length + 1;
                  $timeout(function () {
                    executarMotionEffect(ionicMaterialMotion, effect, effectVelocity);
                    ionicMaterialInk.displayEffect();
                    $scope.loadingIndicator = $ionicLoading.hide();
                  }, 50);

                }else{
                  $scope.numeroDeRegistros = 0;
                  $scope.isExibirMensagemNenhumResultadoEncontrado = true;
                  $scope.mansagemNenhumResultadoEncontrado += filter;
                  $scope.loadingIndicator = $ionicLoading.hide();

                }

              }

            });

          }

        }, 1000);

    }else{
      $scope.loadingIndicator = $ionicLoading.hide();
    }

  }


}



function executarLoadingIndicator($scope, $ionicLoading) {
    $scope.loadingIndicator = $ionicLoading.show({
        template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>',
        animation: 'fade-in',
        showBackdrop: false,
        showDelay: 0
    });
}


function executarMotionEffect(ionicMaterialMotion, effect, velocity){

  var config = {
    startVelocity:velocity
  }

  switch(effect){
    case 'animate-blinds':
      ionicMaterialMotion.blinds(config);
      break;
    case 'animate-ripple':
      ionicMaterialMotion.ripple(config);
      break;
    case 'animate-fade-slide-in':
      ionicMaterialMotion.fadeSlideIn(config);
      break;
    case 'animate-fade-slide-in-right':
      ionicMaterialMotion.fadeSlideInRight(config);
    break;
  }

}

function carregarCategorias($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicLoading) {
    $scope.categorias = restService.obterCategorias();
    $scope.loadingIndicator = $ionicLoading.hide();
    aplicarEfeitoBlinds($timeout, ionicMaterialInk, ionicMaterialMotion, 200);
}

function carregarBarERes($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    var barERelDataModel = restService.obterBareRes($scope, $scope.page, $scope.pageSize);

    barERelDataModel.then(function (response) {
        carregarLugaresComVelocidade($scope, $timeout, response, 0, ionicMaterialInk, ionicMaterialMotion);
    })
}

function carregarLugaresComVelocidade($scope, $timeout, response, velocidade, ionicMaterialInk, ionicMaterialMotion) {
    var place = 0;
    carregarLugares($scope, $timeout, response, place, velocidade, ionicMaterialInk, ionicMaterialMotion);

}

function carregarLugares($scope, $timeout, response, place, velocidade, ionicMaterialInk, ionicMaterialMotion) {
    $timeout(function () {
        response[place].isExisteSite = isExisteSite(response[place].site);
        $scope.places.push(response[place]);
        place++;
        if (place < response.length) {
            carregarLugares($scope, $timeout, response, place, velocidade,ionicMaterialInk, ionicMaterialMotion);
        } else {
            $scope.page += 1;
            $scope.$broadcast('scroll.infiniteScrollComplete');

            var config = {
              startVelocity: 800
            }

            ionicMaterialMotion.fadeSlideIn(config);
            ionicMaterialInk.displayEffect();
        }
    }, velocidade);
}

function carregarHoteis($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion){

  var hoteisDataModel = restService.obterHoteis($scope, $scope.page, $scope.pageSize);

  hoteisDataModel.then(function(response){

    if(response != null || response != undefined){
      for(place = 0; place < response.length; place++){
          response[place].isExisteSite = isExisteSite(response[place].site);
          $scope.places.push(response[place]);
      }

      $scope.page += 1;
      $scope.$broadcast('scroll.infiniteScrollComplete');

      $timeout(function(){
          ionicMaterialMotion.ripple();
          ionicMaterialInk.displayEffect();
      }, 200);

    }

  });

}

function aplicarEfeitoBlinds($timeout, ionicMaterialInk, ionicMaterialMotion, tempoDeEspera) {
    $timeout(function () {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.blinds();
    }, tempoDeEspera);
}

function isExisteSite(str){
  return str !== undefined && str.match(/[a-z]/i);
}

function redirecionar(path) {
    $location.path(path);
};
