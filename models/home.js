const getProdutosPorOrdem = (db)=> async ()=>{
  const produtos = await db('produtos').select('*').orderBy('id','desc').limit('3');
  return produtos;
}


module.exports = {
  getProdutosPorOrdem
}