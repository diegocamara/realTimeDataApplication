var models = require('../models');
var services = require('../services');

exports.obterCategorias = function(req, res){

    models.Categoria.find(function(err, data){
<<<<<<< HEAD
      console.log(data);
=======

>>>>>>> f2b9de54f589d54eb4ddc45aa69e683d1579a9bb
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

exports.obterDemandasRecife = function(req, res){
    var url = 'http://dados.recife.pe.gov.br/storage/f/2016-01-12T201515/156_diario.csv';
   var jsonLoader = services.obterJsonLoaderDemandasRecife();

   jsonLoader.getJsonFromWeb(url, function(json){
      res.send(json);
    });
}
