/**
 * Dados do cardápio extraídos do projeto estático original (Site Lanches/index.html)
 * e enriquecidos para uma experiência mobile-first.
 */

export const IMAGENS_PRODUTOS = {
  xsalada: require('../../assets/images/xsalada.jpg'),
  cheddar: require('../../assets/images/cheddar.jpg'),
  batata: require('../../assets/images/batata.jpg'),
  cheese: require('../../assets/images/cheese.jpg'),
  bigtower: require('../../assets/images/bigtower.jpg'),
  fragonrequeijao: require('../../assets/images/fragonrequeijao.jpg'),
  nuggets: require('../../assets/images/nuggets.jpg'),
  refri: require('../../assets/images/refri.jpg'),
  sucos: require('../../assets/images/sucos.jpg'),
};

export const IMAGENS_APP = {
  logo: require('../../assets/images/logo.png'),
  promocao: require('../../assets/images/promocao.jpg'),
  telefone: require('../../assets/images/telefone.png'),
};

/**
 * Formata um número decimal no padrão monetário brasileiro (ex.: "R$ 8,00").
 * @param {number} valor
 * @returns {string}
 */
export function formatarPreco(valor) {
  const numero = Number(valor) || 0;
  return `R$ ${numero.toFixed(2).replace('.', ',')}`;
}

export const CATEGORIAS = ['Todos', 'Lanches', 'Porções', 'Bebidas'];

export const PROMOCAO_PRINCIPAL = {
  id: 'combo-promocional',
  titulo: 'Promoção!',
  descricao: 'X-Salada + Batata',
  subtitulo: 'Combo campeão da casa com batata crocante na hora',
  preco: 9.9,
  precoFormatado: '9,90',
  selo: 'COMBO DO DIA',
  imagem: IMAGENS_APP.promocao,
};

export const TELEFONE_ENTREGA = {
  numeroExibicao: '(11) 99999-1111',
  numeroDiscagem: 'tel:+5511999991111',
  mensagem: 'Entregamos na sua casa!',
};

export const PRODUTOS_INICIAIS = [
  {
    id: 1,
    nome: 'X-Salada',
    categoria: 'Lanches',
    preco: 8.0,
    precoFormatado: 'R$ 8,00',
    descricao:
      'Hambúrguer artesanal suculento, queijo derretido, alface americana crocante, tomate fresco e maionese da casa no pão selado.',
    imagemChave: 'xsalada',
    imagem: IMAGENS_PRODUTOS.xsalada,
    destaque: true,
    maisVendido: true,
    seloPromocao: null,
  },
  {
    id: 2,
    nome: 'Cheddar',
    categoria: 'Lanches',
    preco: 17.0,
    precoFormatado: 'R$ 17,00',
    descricao:
      'Duplo hambúrguer grelhado coberto com generosa camada de cheddar cremoso e cebola caramelizada no molho shoyu.',
    imagemChave: 'cheddar',
    imagem: IMAGENS_PRODUTOS.cheddar,
    destaque: true,
    maisVendido: true,
    seloPromocao: null,
  },
  {
    id: 3,
    nome: 'Batata Frita',
    categoria: 'Porções',
    preco: 7.0,
    precoFormatado: 'R$ 7,00',
    descricao:
      'Porção caprichada de batatas palito super crocantes por fora e macias por dentro, finalizadas com toque de sal.',
    imagemChave: 'batata',
    imagem: IMAGENS_PRODUTOS.batata,
    destaque: false,
    maisVendido: true,
    seloPromocao: null,
  },
  {
    id: 4,
    nome: 'X-Burguer',
    categoria: 'Lanches',
    preco: 1.5,
    precoFormatado: 'R$ 1,50',
    descricao:
      'O clássico irresistível: pão macio na chapa, hambúrguer suculento e queijo prato derretido na hora.',
    imagemChave: 'cheese',
    imagem: IMAGENS_PRODUTOS.cheese,
    destaque: false,
    maisVendido: false,
    seloPromocao: 'Oferta Relâmpago',
  },
  {
    id: 5,
    nome: 'Big Tower',
    categoria: 'Lanches',
    preco: 20.5,
    precoFormatado: 'R$ 20,50',
    descricao:
      'Para fomes gigantes: camadas de hambúrguer, bacon crocante, queijo, presunto, ovo, salada completa e molho especial.',
    imagemChave: 'bigtower',
    imagem: IMAGENS_PRODUTOS.bigtower,
    destaque: true,
    maisVendido: true,
    seloPromocao: null,
  },
  {
    id: 6,
    nome: 'X-Frango',
    categoria: 'Lanches',
    preco: 12.9,
    precoFormatado: 'R$ 12,90',
    descricao:
      'Filé de frango temperado na chapa com requeijão cremoso, alface fresquinha e tomate selecionado.',
    imagemChave: 'fragonrequeijao',
    imagem: IMAGENS_PRODUTOS.fragonrequeijao,
    destaque: false,
    maisVendido: false,
    seloPromocao: null,
  },
  {
    id: 7,
    nome: 'Nuggets (c/ 8)',
    categoria: 'Porções',
    preco: 6.5,
    precoFormatado: 'R$ 6,50',
    descricao:
      '8 unidades de nuggets de frango dourados e crocantes, acompanhados de molho barbecue ou mostarda e mel.',
    imagemChave: 'nuggets',
    imagem: IMAGENS_PRODUTOS.nuggets,
    destaque: false,
    maisVendido: false,
    seloPromocao: null,
  },
  {
    id: 8,
    nome: 'Refri (Lata)',
    categoria: 'Bebidas',
    preco: 4.5,
    precoFormatado: 'R$ 4,50',
    descricao:
      'Refrigerante em lata 350ml trincando de gelado (diversas opções disponíveis).',
    imagemChave: 'refri',
    imagem: IMAGENS_PRODUTOS.refri,
    destaque: false,
    maisVendido: false,
    seloPromocao: null,
  },
  {
    id: 9,
    nome: 'Sucos (Vários Sabores)',
    categoria: 'Bebidas',
    preco: 8.5,
    precoFormatado: 'R$ 8,50',
    descricao:
      'Sucos naturais de fruta preparados na hora (Laranja, Maracujá, Abacaxi com Hortelã ou Morango) — 400ml.',
    imagemChave: 'sucos',
    imagem: IMAGENS_PRODUTOS.sucos,
    destaque: false,
    maisVendido: false,
    seloPromocao: null,
  },
];
