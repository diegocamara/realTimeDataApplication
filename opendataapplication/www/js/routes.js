angular.module('opendataapplication').config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('mainscreen',{
      url: '/mainscreen',
      templateUrl: 'views/mainscreen.html',
      abstract: true
    })
    .state('mainscreen.home', {
      url: '/home',
      views: {
        'homeview': {
          templateUrl: 'views/home.html',
          controller: 'mainController'
        }
      }
    });

    $urlRouterProvider.otherwise('mainscreen/home');

});
