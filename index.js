var express = require('express');
var cors = require('cors');
var io = require('socket.io').listen(app);
var fs = require('fs');
var json = require('./jsonloader');

var app = express();
app.use(cors());

var jsonResult = undefined;

app.listen(3000, function(){
  console.log("Server is running baby!");

  var url = 'http://dados.recife.pe.gov.br/storage/f/2016-01-11T121515/156_diario.csv';
  json.getJsonFromWeb(url, function(json){
    jsonResult = json;

    fs.watchFile(jsonResult, function(data){
      io.emit('jsonResult', jsonResult);
    });

  });

});
