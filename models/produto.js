const getProdutosPorCategoriasId = (db)=> async (id)=>{
  const produtos = await db('produtos').select('*').where('id', function(){
    this
      .select('categorias_produtos.produto_id')
      .from('categorias_produtos')
      .whereRaw('categorias_produtos.produto_id = produtos.id')
      .where('categoria_id', id);
  });
  return produtos;
}
const getProdutoPorId = (db)=> async (id)=>{
  const produto = await db('produtos').select('*').where('id',id);
  console.log(produto)
  return produto;
}


module.exports = {
  getProdutosPorCategoriasId,
  getProdutoPorId
}