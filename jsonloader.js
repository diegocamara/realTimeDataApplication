var request = require('request');
var Converter = require('csvtojson').Converter;
var converter = new Converter({delimiter: ";"});

var url = 'http://dados.recife.pe.gov.br/storage/f/2016-01-11T121515/156_diario.csv';

var JsonLoader = function(){
}

JsonLoader.prototype.getJsonFromWeb = function(url, callBack){

  converter.on('end_parsed', function(jsonArray){
    callBack(jsonArray);
  });

  request.get(url).pipe(converter);

}

module.exports = new JsonLoader();
