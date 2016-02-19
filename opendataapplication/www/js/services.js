
var modulo = angular.module('opendataapplication');

modulo.factory('restService', function($http){

  //chamar serviço aqui.
  var webserver = "http://nodejs-blankblank.rhcloud.com";


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
          label: "mercadospublicos"
        },
        {
          descricao: "Museus",
          label: "museus"
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

    obterCentrosDeCompras: function(){

      var url = webserver + '/getcentrosdecompras';
      return $http.get(url).then(function(response){
        return response.data.resultado;
      }, function(response){
        alert('Erro ao consultar centros de compras!');
      });

    },

    obterFeirasLivres: function($scope){
      var url = webserver + '/getfeiraslivres';
      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros;
        return response.data.resultado;
      },function(response){
        alert('Erro ao consultar feiras livres!')
      });
    },

    obterMuseus: function($scope){
      var url = webserver + '/getmuseus';
      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros;
        return response.data.resultado;
      }, function(response){
        alert('Erro ao consultar museus!');
      });
    },

    obterMercadosPublicos: function($scope){
      var url = webserver + '/getmercadospublicos';
      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros;
        return response.data.resultado;
      }, function(response){
        alert('Erro ao consultar mercados publicos!');
      });
    },

    obterPontes: function($scope){
      var url = webserver + '/getpontes';
      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros;
        return response.data.resultado;
      }, function(response){
        alert('Erro ao consultar pontes!');
      });
    },

    obterTeatros: function($scope){
      var url = webserver + '/getteatros';
      return $http.get(url).then(function(response){
        $scope.numeroDeRegistros = response.data.numeroDeRegistros;
        return response.data.resultado;
      }, function(response){
        alert('Erro ao consultar teatros!');
      });
    },

    obterTodosRegistros: function(categoria){

      var url = webserver;

      switch (categoria) {
        case 'hoteis':{
          url += '/gettodoshoteis';
          break;
        }
        case 'centrosdecompras':{
          url += '/gettodoscentrosdecompras';
          break;
        }
        case 'feiraslivres':{
          url += '/gettodasfeiraslivres';
          break;
        }
        case 'museus':{
          url += '/gettodosmuseus'
          break;
        }
        case 'mercadospublicos':{
          url += '/gettodosmercadospublicos';
          break;
        }
        case 'pontes':{
          url += '/gettodaspontes';
          break;
        }
        case 'teatros':{
          url += '/gettodosteatros';
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
