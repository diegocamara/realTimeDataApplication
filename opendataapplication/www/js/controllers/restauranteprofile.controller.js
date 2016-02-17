angular.module('opendataapplication.controllers').controller('restauranteProfileController', function($scope, $stateParams){
  $scope.place = $stateParams.place;
})
