const init = () => {
  const router = require('express').Router();
  const homeController = require('../controllers/home');

  router.get('',homeController.index);

  return router;
}
module.exports = init;