import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  isSupabaseConfigured,
} from '../config/supabaseConfig';
import {
  PRODUTOS_INICIAIS,
  IMAGENS_PRODUTOS,
  formatarPreco,
} from '../data/produtosData';

/**
 * Helper assíncrono (Aula 04 — Programação Assíncrona).
 * Retorna uma Promise que resolve após `ms` milissegundos sem travar a UI.
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Executa chamadas REST para o Supabase evitando duplicação de headers e tratamento HTTP.
 * @param {string} caminho
 * @param {RequestInit} [opcoes]
 * @returns {Promise<any>}
 */
async function supabaseRequest(caminho, opcoes = {}) {
  const resposta = await fetch(`${SUPABASE_URL}/rest/v1/${caminho}`, {
    ...opcoes,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      ...(opcoes.headers || {}),
    },
  });

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`Erro Supabase (${resposta.status}): ${detalhe || 'Falha na requisição'}`);
  }

  const texto = await resposta.text();
  return texto ? JSON.parse(texto) : null;
}

/**
 * Normaliza um registro retornado pelo Supabase para o formato esperado pelos componentes.
 * @param {object} item
 * @returns {object}
 */
function normalizarProdutoSupabase(item) {
  const chave = item.imagem_chave || 'xsalada';
  return {
    id: item.id,
    nome: item.nome,
    categoria: item.categoria,
    preco: Number(item.preco),
    precoFormatado: formatarPreco(item.preco),
    descricao: item.descricao,
    imagemChave: chave,
    imagem: IMAGENS_PRODUTOS[chave] || IMAGENS_PRODUTOS.xsalada,
    destaque: Boolean(item.destaque),
    maisVendido: Boolean(item.mais_vendido),
    seloPromocao: item.selo_promocao || null,
  };
}

/**
 * Busca o cardápio de forma assíncrona (async/await + try/catch/finally).
 * Usa Supabase quando configurado e realiza fallback seguro para os dados locais.
 * @returns {Promise<{ produtos: Array, origem: 'supabase' | 'local' }>}
 */
export async function buscarCardapio() {
  if (!isSupabaseConfigured()) {
    await delay(350);
    return { produtos: PRODUTOS_INICIAIS, origem: 'local' };
  }

  try {
    const dados = await supabaseRequest('produtos?select=*&disponivel=eq.true&order=id.asc');
    if (Array.isArray(dados) && dados.length > 0) {
      return {
        produtos: dados.map(normalizarProdutoSupabase),
        origem: 'supabase',
      };
    }
    return { produtos: PRODUTOS_INICIAIS, origem: 'local' };
  } catch (erro) {
    console.warn('Falha ao consultar Supabase, usando cardápio local:', erro.message);
    return { produtos: PRODUTOS_INICIAIS, origem: 'local' };
  }
}

/**
 * Envia mensagem da tela Contato (async/await + try/catch).
 * @param {{ nome: string, contato: string, assunto?: string, mensagem: string }} dados
 * @returns {Promise<{ protocolo: string, origem: 'supabase' | 'local' }>}
 */
export async function enviarMensagemContato({ nome, contato, assunto = 'Dúvida', mensagem }) {
  const protocolo = `AL-${Math.floor(1000 + Math.random() * 9000)}`;

  if (!isSupabaseConfigured()) {
    await delay(500);
    return { protocolo, origem: 'local' };
  }

  await supabaseRequest('mensagens_contato', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      nome: nome.trim(),
      contato: contato.trim(),
      assunto,
      mensagem: mensagem.trim(),
    }),
  });

  return { protocolo, origem: 'supabase' };
}

/**
 * Registra um pedido rápido retornando uma Promise explícita (Aula 04 — Promises).
 * @param {{ id?: number|string, nome: string, preco: number }} produto
 * @returns {Promise<{ idPedido: string, produto: string, origem: 'supabase' | 'local' }>}
 */
export function registrarPedidoRapido(produto) {
  const idPedido = `PED-${Date.now().toString().slice(-4)}`;

  if (!isSupabaseConfigured()) {
    return delay(250).then(() => ({
      idPedido,
      produto: produto.nome,
      origem: 'local',
    }));
  }

  return supabaseRequest('pedidos', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      produto_id: typeof produto.id === 'number' ? produto.id : null,
      produto_nome: produto.nome,
      valor: Number(produto.preco) || 0,
      status: 'recebido',
    }),
  })
    .then(() => ({
      idPedido,
      produto: produto.nome,
      origem: 'supabase',
    }))
    .catch((erro) => {
      console.warn('Erro ao salvar pedido no Supabase, mantendo registro local:', erro.message);
      return {
        idPedido,
        produto: produto.nome,
        origem: 'local',
      };
    });
}
