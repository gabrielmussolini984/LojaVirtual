const init = db => {
  const router = require('express').Router();
  const categoriasRouter = require('./categorias');
  const produtosRouter = require('./produtos');
  const homeRouter = require('./home');

  router.use('/categoria',categoriasRouter(db));
  router.use('/produto',produtosRouter(db));
  router.use('/',homeRouter(db));

  return router;
}
module.exports = init;

