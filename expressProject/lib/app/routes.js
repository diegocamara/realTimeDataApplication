var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.get('/getcatrs', controllers.obterCategorias);

router.get('/getres/', controllers.obterLocaisBaresERestaurantes);

router.get('/getresfilter', controllers.obterBareResPorFiltro);

router.get('/gethoteis', controllers.obterHoteis)

router.get('/gethoteisfilter', controllers.obterHoteisPorFiltro);

router.get('/getservicedemands/', controllers.obterDemandasRecife);

module.exports = router;
