const slug = require('../utils/slug');

const getCategorias = db => async ()=>{
  const categorias = await db('categorias').select('*');
  const categoriasComSlug = categorias.map((categoria)=>{
    const novaCategoria = {...categoria,slug: slug(categoria.categoria)};
    return novaCategoria
  })
  return categoriasComSlug;
}
const getCategoriaPorId = db => async(id) =>{ 
  const categoriaComSlug = await db('categorias').where({id: id}).select('*');
  categoriaComSlug[0].slug = slug(categoriaComSlug[0].categoria);
  return categoriaComSlug;
}
const getCategoriaPorIdProduto = db => async(id) =>{ 
  const categoria = await db('categorias').where('id', function(){
    this
      .select('categorias_produtos.categoria_id')
      .from('categorias_produtos')
      .where('produto_id', id);
  })
  categoria[0].slug = slug(categoria[0].categoria);
  return categoria;
}
module.exports = {
  getCategorias,
  getCategoriaPorId,
  getCategoriaPorIdProduto
}
