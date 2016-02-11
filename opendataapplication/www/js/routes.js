var modulo = angular.module('opendataapplication');

modulo.config(function($stateProvider, $urlRouterProvider, $logProvider, $ionicConfigProvider){

  // Desabilitando log.
  $logProvider.debugEnabled(false);

  $stateProvider.state('mainscreen',{
      url: '/mainscreen',
      templateUrl: 'templates/views/mainscreen.html',
      abstract: true,
      controller: 'appController'
    })

    .state('mainscreen.home', {
      url: '/home',
      views: {
        'menucontentview': {
          templateUrl: 'templates/views/home.html',
          controller: 'homeController'
        }
      }
    })

    .state('mainscreen.map', {
      url: '/map',
      params:{
        categoria: ''
      },
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/map.html',
          controller: 'mapController'
        }
      }
    })

    .state('mainscreen.bareres', {
      url: '/bareres',
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/basreserestaurantes.html',
          controller: 'baresERestaurantesController'
        }
      }
    })

    .state('mainscreen.restauranteProfile',{
      url: '/restauranteProfile',
      params:{
        place: null
      },
      views: {
        'menucontentview': {
          templateUrl: 'templates/views/informacaoRestaurante.html',
          controller: 'restauranteProfileController'
        }
      }
    })

    .state('mainscreen.centcomp',{
      url: '/centrosdecompras',
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/centrosdecompras.html',
          controller: 'centroDeComprasController'
        }
      }
    })

    .state('mainscreen.centroDeComprasProfile', {
      url: '/centroDeComprasProfile',
      params: {
        place: null
      },
      views: {
        'menucontentview':{
          templateUrl: 'templates/views/informacaoCentroDeCompras.html',
          controller: 'centroDeComprasProfileController'
        }
      }
    })

    .state('mainscreen.feliv', {
      url: '/feiraslivres',
      views:{
        'menucontentview': {
          templateUrl: 'templates/views/feiraslivres.html',
          controller: 'feiraslivresController'
        }
      }
    })

    .state('mainscreen.informacaoFeiraLivre',{
      url: '/informacaoFeiraLivre',
      params: {
        place: null
      },
      views: {
        'menucontentview': {
          templateUrl: 'templates/views/informacaoFeiraLivre.html',
          controller: 'feiraLivreProfileController'
        }
      }
    })

    .state('mainscreen.hotel', {
      url: '/hoteis',
      views: {
        'menucontentview':{
          templateUrl: 'templates/views/hoteis.html',
          controller: 'hoteisController'
            }
        }
    })

    .state('mainscreen.hotelProfile', {
      url: '/hotelProfile',
      params:{
        place: null
      },
      views: {
        'menucontentview':{
          templateUrl: 'templates/views/informacaoHotel.html',
          controller: 'hotelProfileController'
        }
      }
    })

    .state('mainscreen.museus', {
      url: '/museus',
      views: {
        'menucontentview':{
          templateUrl: 'templates/views/museus.html',
          controller:'museusController'
        }
      }
    })

    .state('mainscreen.museuProfile', {
      url: '/museuProfile',
      params: {
        place: null
      },
      views: {
        'menucontentview':{
          templateUrl: 'templates/views/informacaoMuseu.html',
          controller:'museuProfileController'
        }
      }
    });



    $urlRouterProvider.otherwise('mainscreen/home');

});
