const init = db => {
  const router = require('express').Router();
  const produtosController = require('../controllers/produtos');

  
  router.get('/:id/:slug', produtosController.getProdutos(db));





  return router;
}
module.exports = init;