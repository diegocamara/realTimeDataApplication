var modulo = angular.module('opendataapplication');

modulo.config(function($stateProvider, $urlRouterProvider, $logProvider, $ionicConfigProvider, $ionicNativeTransitionsProvider){

  // Desabilitando log.
  $logProvider.debugEnabled(false);

  // Desabilitando jsScrolling
  $ionicConfigProvider.scrolling.jsScrolling(false);

  $ionicConfigProvider.navBar.alignTitle('center');


  $ionicNativeTransitionsProvider.enable(false);

  $stateProvider.state('mainscreen',{
      url: '/mainscreen',
      nativeTransitions: null,
      templateUrl: 'templates/views/mainscreen.html',
      abstract: true,
      controller: 'appController'
    })

    .state('mainscreen.home', {
      url: '/home',
      nativeTransitions: null,
      views: {
        'menucontentview': {
          templateUrl: 'templates/views/home.html',
          controller: 'homeController'
        }
      }
    })

    .state('mainscreen.map', {
      url: '/map',
      nativeTransitions: null,
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
      nativeTransitions: null,
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/basreserestaurantes.html',
          controller: 'baresERestaurantesController'
        }
      }
    })

    .state('mainscreen.restauranteProfile',{
      url: '/restauranteProfile',
      nativeTransitions: null,
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
      nativeTransitions: null,
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/centrosdecompras.html',
          controller: 'centroDeComprasController'
        }
      }
    })

    .state('mainscreen.centroDeComprasProfile', {
      url: '/centroDeComprasProfile',
      nativeTransitions: {
        "type": "flip",
        "direction": "right",
        "duration": 2000
      },
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
      nativeTransitions: null,
      views:{
        'menucontentview': {
          templateUrl: 'templates/views/feiraslivres.html',
          controller: 'feiraslivresController'
        }
      }
    })

    .state('mainscreen.informacaoFeiraLivre',{
      url: '/informacaoFeiraLivre',
      nativeTransitions: null,
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
      nativeTransitions: null,
      views: {
        'menucontentview':{
          templateUrl: 'templates/views/hoteis.html',
          controller: 'hoteisController'
            }
        }
    })

    .state('mainscreen.hotelProfile', {
      url: '/hotelProfile',
      nativeTransitions: null,
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
      nativeTransitions: null,
      views: {
        'menucontentview':{
          templateUrl: 'templates/views/museus.html',
          controller:'museusController'
        }
      }
    })

    .state('mainscreen.museuProfile', {
      url: '/museuProfile',
      nativeTransitions: null,
      params: {
        place: null
      },
      views: {
        'menucontentview':{
          templateUrl: 'templates/views/informacaoMuseu.html',
          controller:'museuProfileController'
        }
      }
    })

    .state('mainscreen.mercadospublicos', {
      url: '/mercadospublicos',
      nativeTransitions: null,
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/mercadospublicos.html',
          controller: 'mercadoPublicoController'
        }
      }
    })

    .state('mainscreen.mercadopublicoProfile', {
      url: '/mercadopublicoProfile',
      nativeTransitions: null,
      params:{
        place: null
      },
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/informacaoMercadoPublico.html',
          controller: 'mercadoPublicoProfileController'
        }
      }
    })

    .state('mainscreen.ponte', {
      url: '/pontes',
      nativeTransitions: null,
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/pontes.html',
          controller: 'pontesController'
        }
      }
    })

    .state('mainscreen.ponteProfile', {
      url: '/ponteProfile',
      nativeTransitions: null,
      params:{
        place: null
      },
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/informacaoPonte.html',
          controller: 'ponteProfileController'
        }
      }
    })

    .state('mainscreen.teatro',{
      url: '/teatros',
      nativeTransitions: null,
      views:{
        'menucontentview':{
          templateUrl:'templates/views/teatros.html',
          controller: 'teatrosController'
        }
      }
    })

    .state('mainscreen.teatroProfile',{
      url: '/teatroProfile',
      nativeTransitions: null,
      params:{
        place: null
      },
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/informacaoTeatro.html',
          controller: 'teatroProfileController'
        }
      }
    })

    .state('mainscreen.fullmap',{
      url: '/fullmap',
      nativeTransitions: {
        "type": "flip",
        "direction": "right",
        "duration": 2000
      },
      params:{
        place: null,
        categoria: null
      },
      views:{
        'menucontentview': {
          templateUrl: 'templates/views/fullmap.html',
          controller: 'fullmapController'
        }
      }
    });

    $urlRouterProvider.otherwise('mainscreen/home');

});
