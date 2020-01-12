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

module.exports = {
  getProdutosPorCategoriasId
}