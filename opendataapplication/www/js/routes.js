angular.module('opendataapplication').config(function($stateProvider, $urlRouterProvider){

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
      views:{
        'menucontentview':{
          templateUrl: 'templates/views/map.html',
          controller: 'mapController'
        }
      }
    });

    $urlRouterProvider.otherwise('mainscreen/home');

});
