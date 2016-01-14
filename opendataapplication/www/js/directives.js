angular.module('opendataapplication').directive('ionMdInput', function(){

  return {
    restrict: 'E',
    transclude: true,
    template: '<input type="text" required>'+
      '<span class="md-highlight"></span>'+
      '<span class="md-bar"></span>'+
      '<label>{{label}}</label>',
    scope: {
      'label': '@'
    }
  }

});
