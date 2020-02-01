const init = db => {
  const router = require('express').Router();
  const homeController = require('../controllers/home');

  router.get('',homeController.index(db));
  return router;
}
module.exports = init;