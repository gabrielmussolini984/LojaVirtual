const categoriaModels = require('../models/categoria');
const produtoModels = require('../models/produto');

const getCategorias = db => async (req,res)=>{
  const categoria = await categoriaModels.getCategoriaPorId(db)(req.params.id);
  const produtos = await produtoModels.getProdutosPorCategoriasId(db)(req.params.id);
  res.render('categoria',{estaCategoria: categoria[0],produtos});
}


module.exports = {
  getCategorias
}