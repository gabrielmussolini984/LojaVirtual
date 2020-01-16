const categoriaModels = require('../models/categoria');
const produtoModels = require('../models/produto');

const getProdutos = db => async (req,res)=>{
  const categoria = await categoriaModels.getCategoriaPorIdProduto(db)(req.params.id);
  const produto = await produtoModels.getProdutoPorId(db)(req.params.id);
  res.render('produto-detalhe', {produto: produto[0], estaCategoria: categoria[0] } )
} 

module.exports = {
  getProdutos
}