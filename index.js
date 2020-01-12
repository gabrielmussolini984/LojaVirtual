// Imports
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const slug = require('./utils/slug')

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
  const categorias = await db('categorias').select('*');
  const categoriasComSlug = categorias.map((categoria)=>{
    const novaCategoria = {...categoria,slug: slug(categoria.categoria)};
    return novaCategoria
  })
  res.render('home',{categorias: categoriasComSlug});
});

app.get('/categoria/:id', async(req,res)=>{
  const categoria = await db('categorias').where({id: req.params.id}).select('*');
  const categorias = await db('categorias').select('*');
  const produtos = await db('produtos').select('*').where('id', function(){
    this
      .select('categorias_produtos.produto_id')
      .from('categorias_produtos')
      .whereRaw('categorias_produtos.produto_id = produtos.id')
      .where('categoria_id', req.params.id);
  })
  res.render('categoria',{categorias,estaCategoria: categoria[0],produtos});
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