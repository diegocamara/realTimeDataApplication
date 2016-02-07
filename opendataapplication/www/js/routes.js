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
        place: null
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
    });



    $urlRouterProvider.otherwise('mainscreen/home');

});
