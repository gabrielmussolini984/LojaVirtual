const homeModels = require('../models/home');
const index = db =>  async(req,res)=>{
 const novosProdutos = await homeModels.getProdutosPorOrdem(db)();
 console.log('xx',novosProdutos)
  res.render('home',{novosProdutos});
}

module.exports = {
  index
}