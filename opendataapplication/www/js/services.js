angular.module('opendataapplication', ['ionic', 'ionic-material', 'ngCordova']).factory('restService', function($http){

  //chamar serviço aqui.
  var webserver = "http://localhost:3000";


  return{
    obterCategorias: function(){
      var url = webserver + "/getcatrs";
      var categorias = [];
      return $http.get(url).then(function(response){
        return response.data;
      },function(response){
        alert('error ao consultar as categorias!');
      });
  },
    obterBareRes: function($scope, page, size){

      var url = webserver + "/getres?page=" + page + "&size=" + size;
      var bareserestaurantes = [];

      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros
        return response.data.resultado;
      },function(response){
        alert('error ao consultar bares e restaurantes!');
      });

    }
  };

});
