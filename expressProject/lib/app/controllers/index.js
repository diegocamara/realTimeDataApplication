var models = require('../models');
var services = require('../services');

exports.obterCategorias = function(req, res){

    models.Categoria.find(function(err, data){

      if(err){
        throw err;
      }

      res.send(data);

    });

}

exports.obterLocaisBaresERestaurantes = function(req, res){

  var page = parseInt(req.query.page);
  var size = parseInt(req.query.size);
  var skip = (page > 0) ? (page - 1) * size : 0

  models.Restaurante.find(null, null,
    {skip:skip,
     limit:size
    },function(err, data){

        models.Restaurante.count(function(err, count){

        if(err){
          throw err;
        }

        var result = {
          numeroDeRegistros:count,
          resultado: data
        }

        res.send(result);

      });

  });
}

exports.obterBareResPorFiltro = function(req, res){

  var nome = req.query.nome;

  models.Restaurante.find({"nome": {$regex: new RegExp(nome, "i")}}, null,{sort:{nome: 1}}, function(err, data){

    models.Restaurante.count(function(err, count){

      if(err){
        throw err;
      }

      var result = {
        numeroDeRegistros:count,
        resultado: data
      }

      res.send(result);

    });

  });


}

exports.obterHoteis = function(req, res){

  var page = parseInt(req.query.page);
  var size = parseInt(req.query.size);
  var skip = (page > 0) ? (page - 1) * size : 0

  models.Hotel.find(null, null,
    {skip:skip,
     limit:size
    },function(err, data){

        models.Hotel.count(function(err, count){

        if(err){
          throw err;
        }

        var result = {
          numeroDeRegistros:count,
          resultado: data
        }

        res.send(result);

      });

  });

}

exports.obterDemandasRecife = function(req, res){
    var url = 'http://dados.recife.pe.gov.br/storage/f/2016-01-12T201515/156_diario.csv';
    url = 'http://dados.recife.pe.gov.br/storage/f/2013-08-08T18%3A35%3A03.036Z/hoteis.csv';
   var jsonLoader = services.obterJsonLoaderDemandasRecife();

   jsonLoader.getJsonFromWeb(url, function(json){
      res.send(json);
    });
}
