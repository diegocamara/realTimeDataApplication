var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.get('/getcatrs', controllers.obterCategorias);

router.get('/getres/', controllers.obterLocaisBaresERestaurantes);

router.get('/getservicedemands/', controllers.obterDemandasRecife);

module.exports = router;
