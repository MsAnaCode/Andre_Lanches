import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IMAGENS_APP } from '../data/produtosData';

const ABAS = ['Lanches', 'Sobre Nós', 'Contato'];

/**
 * Cabeçalho mobile-first do André Lanches.
 * - Posiciona a logo reduzida no topo esquerdo (Parte 1 do roteiro)
 * - Barra de navegação limpa com botões padronizados via Flexbox (Aula 11)
 * - Combinação condicional de estilos com array (Aula 10) e operador && (Aula 06)
 */
export default function Header({ abaAtiva, onMudarAba, quantidadePedidos = 0, onAbrirCarrinho }) {
  return (
    <View style={styles.headerContainer}>
      {/* Linha superior: Logo reduzida à esquerda + indicador/botão de pedidos à direita */}
      <View style={styles.topoLinha}>
        <View style={styles.marcaGrupo}>
          <Image source={IMAGENS_APP.logo} style={styles.logoImagem} resizeMode="contain" />
          <View style={styles.marcaTextos}>
            <Text style={styles.tituloMarca}>André Lanches</Text>
            <Text style={styles.subtituloMarca}>Sabor artesanal direto no celular</Text>
          </View>
        </View>

        <TouchableOpacity
          style={quantidadePedidos > 0 ? styles.badgePedidos : styles.badgeCarrinhoVazio}
          onPress={onAbrirCarrinho}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Ver carrinho de pedidos"
        >
          <Text style={quantidadePedidos > 0 ? styles.badgePedidosTexto : styles.badgeCarrinhoVazioTexto}>
            🛒 Carrinho{quantidadePedidos > 0 ? ` (${quantidadePedidos})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegação padronizada com 3 abas */}
      <View style={styles.barraNavegacao}>
        {ABAS.map((aba) => {
          const isAtiva = abaAtiva === aba;
          return (
            <TouchableOpacity
              key={aba}
              activeOpacity={0.8}
              onPress={() => onMudarAba(aba)}
              style={[styles.abaBotao, isAtiva && styles.abaBotaoAtivo]}
              accessibilityRole="button"
              accessibilityState={{ selected: isAtiva }}
            >
              <Text style={[styles.abaTexto, isAtiva && styles.abaTextoAtivo]}>{aba}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ffe18c',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#f3c65f',
  },
  topoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  marcaGrupo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoImagem: {
    width: 44,
    height: 44,
    marginRight: 10,
  },
  marcaTextos: {
    flex: 1,
  },
  tituloMarca: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e50021',
    letterSpacing: 0.3,
  },
  subtituloMarca: {
    fontSize: 12,
    color: '#5c3b00',
    fontWeight: '600',
  },
  badgeCarrinhoVazio: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#e50021',
  },
  badgeCarrinhoVazioTexto: {
    color: '#e50021',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgePedidos: {
    backgroundColor: '#e50021',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgePedidosTexto: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  barraNavegacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e50021',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 3,
  },
  abaBotao: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  abaBotaoAtivo: {
    backgroundColor: '#ffffff',
  },
  abaTexto: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  abaTextoAtivo: {
    color: '#e50021',
    textTransform: 'uppercase',
    fontSize: 13,
  },
});
