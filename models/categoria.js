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
  const categoria = await db('categorias').where({id: id}).select('*');
  return categoria;
}

module.exports = {
  getCategorias,
  getCategoriaPorId
}
