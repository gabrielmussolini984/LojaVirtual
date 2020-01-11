// Imports
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

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

app.get('/', async(req,res)=>{
  const categorias = await db('categorias').select('*');
  console.log(categorias);
  res.render('layouts/main',{categorias})
});

//Port Config and Server
const port = process.env.PORT || 3000;
app.listen(port, err=>{
  if (err){
    console.log('Não foi possivel conectar ao servidor');
  }else{
    console.log('Conectado ao servidor!');
  }
});