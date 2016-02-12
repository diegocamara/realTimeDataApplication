

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

.controller('baresERestaurantesController', function ($scope, $timeout, $state, $ionicLoading, ionicMaterialInk,
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

    $scope.goToProfile = function(p){
      $state.go('mainscreen.restauranteProfile', {place: p});
    }

    moreDataCanBeLoad($scope);
    inputFocus($scope, $timeout);

    var dataModel = {
      filter:'',
      consulta: function(){
      return restService.obterBareResPorNome($scope, this.filter);
    }}

    inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-fade-slide-in', dataModel);

})

.controller('centroDeComprasController', function($scope, $ionicLoading, $timeout, $state, ionicMaterialInk, ionicMaterialMotion, restService){

  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);

  $scope.page = 0;
  $scope.pageSize = 20;
  $scope.numeroDeRegistros = 0;
  $scope.places = [];
  $scope.isExibirMensagemNenhumResultadoEncontrado = false;
  $scope.mansagemNenhumResultadoEncontrado = "Não foram encontrados lugares para ";
  $scope.isInSearch = false;
  $scope.isShowFabMapButton = false;


  $scope.scrollTop = function(){
    $ionicScrollDelegate.scrollTop();
  }

  $scope.loadMore = function () {
    caregarCentroDeCompras($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService);
  }

  $scope.goToProfile = function(p){
    $state.go('mainscreen.centroDeComprasProfile', {place: p});
  }

  moreDataCanBeLoad($scope);
  inputFocus($scope, $timeout);

  var dataModel = {
    filter:'',
    consulta: function(){
    return restService.obterHoteisPorNome($scope, this.filter);
  }}

  inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-ripple', dataModel);

  moveFab($scope, $timeout, 'fab');
  motionFab($scope, $timeout, 'motion');

  $timeout(function () {
    $scope.isShowFabMapButton = true;
    $scope.motionFab('motion');
  }, 2000);

})

.controller('centroDeComprasProfileController', function($scope,  $stateParams){

  $scope.place = $stateParams.place;

  $scope.isLocalizacaoDisponivel = function(){
    return $scope.place != null && $scope.place.latitude != null && $scope.place.longitude != null;
  }

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

  });

})

.controller('feiraslivresController', function($scope, $ionicLoading, $timeout, $state, ionicMaterialInk, ionicMaterialMotion, restService){

  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);

  $scope.page = 0;
  $scope.pageSize = 20;
  $scope.numeroDeRegistros = 0;
  $scope.places = [];
  $scope.isExibirMensagemNenhumResultadoEncontrado = false;
  $scope.mansagemNenhumResultadoEncontrado = "Não foram encontrados lugares para ";
  $scope.isInSearch = false;
  $scope.isShowFabMapButton = false;


  $scope.scrollTop = function(){
    $ionicScrollDelegate.scrollTop();
  }

  $scope.loadMore = function () {
    restService.obterFeirasLivres($scope).then(function(feirasLivres){
      for (var place = 0; place < feirasLivres.length; place++){
        feirasLivres[place].isExisteSite = isExisteSite(feirasLivres[place].site);
        $scope.places.push(feirasLivres[place]);
      }

      $scope.loadingIndicator = $ionicLoading.hide();

      $timeout(function () {
        executarMotionEffect(ionicMaterialMotion, 'animate-blinds');
        ionicMaterialInk.displayEffect();
        $scope.loadingIndicator = $ionicLoading.hide();
      }, 50);

    });
  }

  $scope.goToProfile = function(p){
    $state.go('mainscreen.informacaoFeiraLivre', {place:p});
  }

  moreDataCanBeLoad($scope);
  inputFocus($scope, $timeout);

  var dataModel = {
    filter:'',
    consulta: function(){
    return restService.obterHoteisPorNome($scope, this.filter);
  }}

  inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-blinds', dataModel);

  moveFab($scope, $timeout, 'fab');
  motionFab($scope, $timeout, 'motion');

  $timeout(function () {
    $scope.isShowFabMapButton = true;
    $scope.motionFab('motion');
  }, 2000);

})

.controller('feiraLivreProfileController', function($scope, $stateParams){
  $scope.place = $stateParams.place;
  $scope.place.isExisteObservacao = $scope.place.observacao != null;

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

  });

  $scope.isLocalizacaoDisponivel = function(){
    return $scope.place != null && $scope.place.latitude != null && $scope.place.longitude != null;
  }

})

.controller('restauranteProfileController', function($scope, $stateParams){
  $scope.place = $stateParams.place;
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
      $scope.isShowFabMapButton = false;


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

      inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-ripple', dataModel);

      moveFab($scope, $timeout, 'fab');
      motionFab($scope, $timeout, 'motion');

      $timeout(function () {
        $scope.isShowFabMapButton = true;
        $scope.motionFab('motion');
      }, 2000);



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


}])

.controller('museusController', function($scope, $state, $timeout, $ionicLoading, ionicMaterialInk,
    ionicMaterialMotion, $ionicScrollDelegate, restService){

  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);

  $scope.page = 0;
  $scope.pageSize = 20;
  $scope.numeroDeRegistros = 0;
  $scope.places = [];
  $scope.isExibirMensagemNenhumResultadoEncontrado = false;
  $scope.mansagemNenhumResultadoEncontrado = "Não foram encontrados lugares para ";
  $scope.isInSearch = false;
  $scope.isShowFabMapButton = false;


  $scope.scrollTop = function(){
    $ionicScrollDelegate.scrollTop();
  }

  $scope.loadMore = function () {
    caregarMuseus($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService);
  }

  $scope.goToProfile = function(p){
    $state.go('mainscreen.museuProfile', {place: p});
  }

  moreDataCanBeLoad($scope);
  inputFocus($scope, $timeout);

  var dataModel = {
    filter:'',
    consulta: function(){
    return restService.obterHoteisPorNome($scope, this.filter);
  }}

  inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, 'animate-ripple', dataModel);

  moveFab($scope, $timeout, 'fab');
  motionFab($scope, $timeout, 'motion');

  $timeout(function () {
    $scope.isShowFabMapButton = true;
    $scope.motionFab('motion');
  }, 2000);

})

.controller('museuProfileController', function($scope, $stateParams){

  $scope.place = $stateParams.place;

  console.log($scope.place);

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

});


function moveFab($scope, $timeout, fabId){

  $scope.fab = document.getElementById(fabId);

  $scope.moveFab = function(dir) {
      fab.style.display = 'none';
      fab.className = fab.className.replace('button-fab-top-left', '');
      fab.className = fab.className.replace('button-fab-top-right', '');
      fab.className = fab.className.replace('button-fab-bottom-left', '');
      fab.className = fab.className.replace('button-fab-bottom-right', '');
      fab.className += ' button-fab-' + dir;
      $timeout(function() {
          fab.style.display = 'block';
      }, 100);
  };
}

function motionFab($scope, $timeout, type){

  $scope.motionFab = function(type) {
      var shouldAnimate = false;
      var classes = type instanceof Array ? type : [type];

      function toggleMotionClass (theClass) {
          $timeout(function() {
              fab.classList.toggle(theClass);
          }, 300);
      }

      for (var i = 0; i < classes.length; i++) {
          fab.classList.toggle(classes[i]);

          shouldAnimate = fab.classList.contains(classes[i]);
          if (shouldAnimate) {
              (toggleMotionClass)(classes[i]);
          }
      }
  };

}

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
        moreDataCanBeLoad = $scope.places.length == 0 ? $scope.places.length <= $scope.numeroDeRegistros : $scope.places.length < $scope.numeroDeRegistros;
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


function inputChange($scope, $timeout, $ionicLoading, ionicMaterialMotion, ionicMaterialInk, restService, effect, dataModel){

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
                    executarMotionEffect(ionicMaterialMotion, effect);
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


function executarMotionEffect(ionicMaterialMotion, effect){

  switch(effect){
    case 'animate-blinds':
      ionicMaterialMotion.blinds();
      break;
    case 'animate-ripple':
      ionicMaterialMotion.ripple();
      break;
    case 'animate-fade-slide-in':
      ionicMaterialMotion.fadeSlideIn();
      break;
    case 'animate-fade-slide-in-right':
      ionicMaterialMotion.fadeSlideInRight();
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

            ionicMaterialMotion.fadeSlideIn();
            ionicMaterialInk.displayEffect();
        }
    }, velocidade);
}

function carregarHoteis($scope, restService, $timeout, ionicMaterialInk, ionicMaterialMotion){

  var hoteisDataModel = restService.obterHoteis($scope, $scope.page, $scope.pageSize);

  hoteisDataModel.then(function(response){

    if(response != null || response != undefined){
      for (place = 0; place < response.length; place++){
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

function caregarCentroDeCompras($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService){

  restService.obterCentrosDeCompras().then(function(centrosDeCompras){
    for (var place = 0; place < centrosDeCompras.length; place++){
      centrosDeCompras[place].isExisteSite = isExisteSite(centrosDeCompras[place].site);
      $scope.places.push(centrosDeCompras[place]);
    }

    $scope.loadingIndicator = $ionicLoading.hide();

    $timeout(function () {
      executarMotionEffect(ionicMaterialMotion, 'animate-fade-slide-in-right');
      ionicMaterialInk.displayEffect();
      $scope.loadingIndicator = $ionicLoading.hide();

    }, 50);

  });

}

function caregarMuseus($scope, $ionicLoading, $timeout, ionicMaterialInk, ionicMaterialMotion, restService){

  restService.obterMuseus($scope).then(function(museus){
    for (var place = 0; place < museus.length; place++){
      museus[place].isExisteSite = isExisteSite(museus[place].site);
      $scope.places.push(museus[place]);
    }

    $scope.loadingIndicator = $ionicLoading.hide();

    $timeout(function () {
      executarMotionEffect(ionicMaterialMotion, 'animate-fade-slide-in-right');
      ionicMaterialInk.displayEffect();
      $scope.loadingIndicator = $ionicLoading.hide();

    }, 50);

  });

}

function obterFeirasLivresValidas(categoria, markers){

    var feiraslivres = [];

    for (var place = 0; place < markers.length; place++) {
      feiraslivres.push({nome: markers[place].Nome, latitude: markers[place].Latitude, longitude: markers[place].Longitude});
    }

    return feiraslivres;

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
