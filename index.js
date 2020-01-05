// Imports
const express = require('express');
const handlebars = require('express-handlebars');

//App
const app = express();

app.get('/', (req,res)=>{
  res.send('Shop')
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