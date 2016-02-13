var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.get('/getcatrs', controllers.obterCategorias);

router.get('/getres/', controllers.obterLocaisBaresERestaurantes);

router.get('/getresfilter', controllers.obterBareResPorFiltro);

router.get('/gethoteis', controllers.obterHoteis)

router.get('/gethoteisfilter', controllers.obterHoteisPorFiltro);

router.get('/gettodoshoteis', controllers.obterTodosHoteis);

router.get('/getcentrosdecompras', controllers.obterCentrosDeCompras);

router.get('/gettodoscentrosdecompras', controllers.obterTodosCentrosDeCompras);

router.get('/getfeiraslivres', controllers.obterFeirasLivres);

router.get('/gettodasfeiraslivres', controllers.obterTodasFeirasLivres);

router.get('/getmuseus', controllers.obterMuseus);

router.get('/gettodosmuseus', controllers.obterTodosMuseus);

router.get('/getmercadospublicos', controllers.obterMercadosPublicos);

router.get('/gettodosmercadospublicos', controllers.obterTodosMercadosPublicos);

router.get('/getservicedemands/', controllers.obterDemandasRecife);

module.exports = router;
