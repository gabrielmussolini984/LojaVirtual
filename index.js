// Imports
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

//App
const app = express();


// Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Public
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>{
  res.render('layouts/main')
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