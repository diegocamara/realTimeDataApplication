
var modulo = angular.module('opendataapplication');

modulo.factory('restService', function($http){

  //chamar serviço aqui.
  var webserver = "http://88164926.ngrok.io";


  return{

    obterCategorias: function(){

      var categorias = [
        {
          descricao: "Bares e Restaurantes",
          label: "bareres"
        },
        {
          descricao: "Centros de Compras",
          label: "centcomp"
        },
        {
          descricao: "Feiras Livres",
          label: "feliv"
        },
        {
          descricao: "Hóteis",
          label: "hotel"
        },
        {
          descricao: "Mercados Públicos",
          label: "merpu"
        },
        {
          descricao: "Museus",
          label: "museu"
        },
        {
          descricao: "Pontes do Recife",
          label: "ponte"
        },
        {
          descricao: "Teatros",
          label: "teatro"
        }
    ];

    return categorias;

    },

    obterBareRes: function($scope, page, size){

      var url = webserver + "/getres?page=" + page + "&size=" + size;

      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros
        return response.data.resultado;
      },function(response){
        alert('error ao consultar bares e restaurantes!');
      });

    },

    obterBareResPorNome: function($scope, filter){

      var url = webserver + "/getresfilter?nome=" + filter;

      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros
        return response.data.resultado;
      }, function(response){
        alert('Erro ao consultar bares e restaurantes!');
      });

    },

    obterHoteis: function($scope, page, size){

      var url = webserver + "/gethoteis?page=" + page + "&size=" + size;

      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros
        return response.data.resultado;
      },function(response){
        alert('error ao consultar hoteis!');
      });

    },

    obterHoteisPorNome: function($scope, filter){

      var url = webserver + "/gethoteisfilter?nome=" + filter;
      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros
        return response.data.resultado;
      }, function(response){
        alert('Erro ao consultar hoteis!');
      });

    },

    obterTodosRegistros: function(categoria){

      var url = webserver;

      switch (categoria) {
        case 'hoteis':{
          url += '/gettodoshoteis';
          break;
        }
      }

      return $http.get(url).then(function(response){
        return response.data;
      }, function(response){
        alert('Erro ao consultar os marcadores!');
      })
    }

  };

});
