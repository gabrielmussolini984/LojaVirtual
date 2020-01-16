const init = db => {
  const router = require('express').Router();
  const categoriasController = require('../controllers/categorias');
  // categorias
  router.get('/:id/:slug', categoriasController.getCategorias(db));





  return router;
}




module.exports = init;