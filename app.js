const init = db => {
  const categoriaModels = require('./models/categoria');
  const path = require('path');
  const handlebars = require('express-handlebars');
  const express = require('express');
  const app = express();
  // Handlebars
  app.set('views', path.join(__dirname, 'views'));
  app.engine('handlebars', handlebars());
  app.set('view engine', 'handlebars');
  // Public
  app.use(express.static(path.join(__dirname,'public')));
  // Middleware
  app.use(async (req,res,next)=>{
    const categorias = await categoriaModels.getCategorias(db)();
    res.locals = {
      categorias
    }
    next();
  })
  // Rotas
  const routes = require('./routes')
  app.use(routes(db));
  return app;
}
module.exports = init;
