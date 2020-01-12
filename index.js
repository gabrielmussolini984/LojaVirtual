// Imports
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const categoriaModels = require('./models/categoria');
const produtoModels = require('./models/produto');

// DB
const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shop'
  }
});
db.on('query', query =>{
  console.log('SQL:',query.sql);
});
//App
const app = express();


// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
 
// Public
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static(__dirname + '/public'));


app.get('/', async(req,res)=>{
  const categorias = await categoriaModels.getCategorias(db)();
  res.render('home',{categorias});
});

app.get('/categoria/:id/:slug', async(req,res)=>{
  const categoria = await categoriaModels.getCategoriaPorId(db)(req.params.id);
  const categorias = await categoriaModels.getCategorias(db)();
  const produtos = await produtoModels.getProdutosPorCategoriasId(db)(req.params.id);
  res.render('categoria',{categorias,estaCategoria: categoria[0],produtos});
})
app.get('/produto/:id/:slug', async(req,res)=>{
  const categoria = await categoriaModels.getCategoriaPorIdProduto(db)(req.params.id);
  const categorias = await categoriaModels.getCategorias(db)();
  const produto = await produtoModels.getProdutoPorId(db)(req.params.id);
  res.render('produto-detalhe', {produto: produto[0], categorias, estaCategoria: categoria[0] } )
})

//Port Config and Server
const port = process.env.PORT || 3000;
app.listen(port, err=>{
  if (err){
    console.log('Não foi possivel conectar ao servidor');
  }else{
    console.log('Conectado ao servidor!');
  }
});