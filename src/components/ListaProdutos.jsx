import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BannerPromocao from './BannerPromocao';
import { CATEGORIAS, PRODUTOS_INICIAIS } from '../data/produtosData';
import { buscarCardapio } from '../services/api';

const { width: larguraTela } = Dimensions.get('window');

/**
 * Componente de cardápio mobile-first do André Lanches.
 * - Busca assíncrona na montagem com useEffect + async/await + try/catch/finally (Aulas 04 e 08)
 * - Layout responsivo com Flexbox, flexWrap e API Dimensions (Aula 11)
 * - Renderização condicional com operador && e operador ternário (Aula 06)
 */
export default function ListaProdutos({ onSelecionarProduto, bannerProps }) {
  const [produtos, setProdutos] = useState(PRODUTOS_INICIAIS);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [carregando, setCarregando] = useState(true);
  const [origemDados, setOrigemDados] = useState('local');

  useEffect(() => {
    let ativo = true;

    async function carregarCardapio() {
      try {
        const resultado = await buscarCardapio();
        if (ativo) {
          setProdutos(resultado.produtos);
          setOrigemDados(resultado.origem);
        }
      } catch (erro) {
        console.error('Erro ao carregar cardápio:', erro);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarCardapio();

    return () => {
      ativo = false;
    };
  }, []);

  const produtosFiltrados =
    categoriaAtiva === 'Todos'
      ? produtos
      : produtos.filter((item) => item.categoria === categoriaAtiva);

  const tamanhoImagem = larguraTela < 370 ? 78 : 92;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.conteudoScroll}
      showsVerticalScrollIndicator={false}
    >
      {/* Banner reutilizável recebendo título, descrição, preço e imagem via props */}
      {bannerProps && <BannerPromocao {...bannerProps} />}

      {/* Título da seção e indicador de origem (Local vs. Supabase) */}
      <View style={styles.cabecalhoSecao}>
        <View style={styles.tituloGrupo}>
          <Text style={styles.tituloSecao}>Nossos Lanches</Text>
          <Text style={styles.subtituloSecao}>
            {produtosFiltrados.length}{' '}
            {produtosFiltrados.length === 1 ? 'opção disponível' : 'opções disponíveis'}
          </Text>
        </View>

        <View
          style={[
            styles.origemBadge,
            origemDados === 'supabase' ? styles.origemSupabase : styles.origemLocal,
          ]}
        >
          <Text style={styles.origemTexto}>
            {origemDados === 'supabase' ? 'Supabase Online' : 'Cardápio Local'}
          </Text>
        </View>
      </View>

      {/* Filtros por categoria usando flexDirection row + flexWrap wrap (Aula 11) */}
      <View style={styles.filtrosContainer}>
        {CATEGORIAS.map((categoria) => {
          const selecionada = categoria === categoriaAtiva;
          return (
            <TouchableOpacity
              key={categoria}
              activeOpacity={0.8}
              onPress={() => setCategoriaAtiva(categoria)}
              style={[styles.filtroPill, selecionada && styles.filtroPillAtiva]}
            >
              <Text style={[styles.filtroTexto, selecionada && styles.filtroTextoAtivo]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {carregando ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#e50021" />
          <Text style={styles.loadingTexto}>Carregando cardápio fresquinho...</Text>
        </View>
      ) : (
        <View style={styles.listaCards}>
          {produtosFiltrados.map((produto) => (
            <View
              key={produto.id}
              style={[styles.card, produto.destaque && styles.cardDestaque]}
            >
              <Image
                source={produto.imagem}
                style={[
                  styles.imagemProduto,
                  {
                    width: tamanhoImagem,
                    height: tamanhoImagem,
                    borderRadius: tamanhoImagem / 2,
                  },
                ]}
                resizeMode="cover"
              />

              <View style={styles.infoProduto}>
                <View style={styles.selosLinha}>
                  <Text style={styles.categoriaTag}>{produto.categoria}</Text>

                  {/* Renderização condicional com && (Aula 06) */}
                  {produto.maisVendido && (
                    <View style={styles.seloMaisVendido}>
                      <Text style={styles.seloMaisVendidoTexto}>Mais Vendido</Text>
                    </View>
                  )}

                  {Boolean(produto.seloPromocao) && (
                    <View style={styles.seloOferta}>
                      <Text style={styles.seloOfertaTexto}>{produto.seloPromocao}</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.nomeProduto}>{produto.nome}</Text>
                <Text style={styles.descricaoProduto} numberOfLines={3}>
                  {produto.descricao}
                </Text>

                <View style={styles.cardRodape}>
                  <Text style={styles.precoProduto}>{produto.precoFormatado}</Text>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => onSelecionarProduto(produto)}
                    style={styles.botaoPedir}
                  >
                    <Text style={styles.botaoPedirTexto}>
                      {produto.destaque ? 'Pedir Agora' : 'Pedir'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  conteudoScroll: {
    padding: 16,
    paddingBottom: 116, // Espaço extra para não ficar encoberto pelo botão EntregaFlutuante
  },
  cabecalhoSecao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tituloGrupo: {
    flex: 1,
  },
  tituloSecao: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e50021',
  },
  subtituloSecao: {
    fontSize: 13,
    color: '#6b4c14',
    marginTop: 2,
  },
  origemBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  origemSupabase: {
    backgroundColor: '#dcfce7',
  },
  origemLocal: {
    backgroundColor: '#fef3c7',
  },
  origemTexto: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
  },
  filtrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filtroPill: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#f3c65f',
  },
  filtroPillAtiva: {
    backgroundColor: '#e50021',
    borderColor: '#e50021',
  },
  filtroTexto: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#7c2d12',
  },
  filtroTextoAtivo: {
    color: '#ffffff',
  },
  loadingBox: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTexto: {
    marginTop: 10,
    fontSize: 14,
    color: '#7c2d12',
    fontWeight: '600',
  },
  listaCards: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fde68a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  cardDestaque: {
    borderColor: '#fca5a5',
    borderWidth: 1.5,
  },
  imagemProduto: {
    borderWidth: 2,
    borderColor: '#e50021',
    marginRight: 12,
    backgroundColor: '#fff7ed',
  },
  infoProduto: {
    flex: 1,
  },
  selosLinha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  categoriaTag: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#9a3412',
    backgroundColor: '#ffedd5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  seloMaisVendido: {
    backgroundColor: '#fef08a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  seloMaisVendidoTexto: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#854d0e',
  },
  seloOferta: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  seloOfertaTexto: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#b91c1c',
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  descricaoProduto: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
    marginTop: 3,
  },
  cardRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  precoProduto: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#e50021',
  },
  botaoPedir: {
    backgroundColor: '#e50021',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  botaoPedirTexto: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
