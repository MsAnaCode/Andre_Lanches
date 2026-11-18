import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { formatarPreco } from '../data/produtosData';

/**
 * Modal do Carrinho de Pedidos.
 * - Lista todos os itens selecionados pelo cliente
 * - Exibe quantidade, subtotal por item e total geral
 * - Permite remover item individual ou cancelar todo o pedido
 * - Permite avançar para a finalização / contato
 */
export default function CarrinhoModal({
  visivel,
  itens = [],
  onFechar,
  onRemoverItem,
  onCancelarTudo,
  onFinalizar,
}) {
  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  return (
    <Modal
      visible={visivel}
      animationType="slide"
      transparent
      onRequestClose={onFechar}
    >
      <View style={styles.fundoModal}>
        <View style={styles.containerModal}>
          {/* Cabeçalho do Modal */}
          <View style={styles.cabecalho}>
            <View>
              <Text style={styles.tituloModal}>Meus Pedidos 🍔</Text>
              <Text style={styles.subtituloModal}>
                {itens.length === 0
                  ? 'Nenhum pedido selecionado'
                  : `${itens.reduce((acc, i) => acc + i.quantidade, 0)} item(ns) selecionado(s)`}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onFechar}
              style={styles.botaoFechar}
              accessibilityRole="button"
              accessibilityLabel="Fechar carrinho"
            >
              <Text style={styles.botaoFecharTexto}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Itens do Pedido */}
          {itens.length === 0 ? (
            <View style={styles.vazioContainer}>
              <Text style={styles.vazioEmoji}>🛒</Text>
              <Text style={styles.vazioTexto}>Nenhum pedido selecionado</Text>
              <Text style={styles.vazioSubtexto}>
                Toque em "Pedir" nos lanches do cardápio para adicioná-los ao carrinho.
              </Text>
            </View>
          ) : (
            <FlatList
              data={itens}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={styles.listaConteudo}
              renderItem={({ item }) => (
                <View style={styles.cardItem}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemNome}>{item.nome}</Text>
                    <Text style={styles.itemPrecoUnitario}>
                      {item.quantidade}x {formatarPreco(item.preco)} ={' '}
                      <Text style={styles.itemSubtotal}>
                        {formatarPreco(item.preco * item.quantidade)}
                      </Text>
                    </Text>
                  </View>

                  {/* Botão de Cancelar/Remover este item */}
                  <TouchableOpacity
                    onPress={() => onRemoverItem(item.id)}
                    style={styles.botaoRemover}
                    accessibilityRole="button"
                    accessibilityLabel={`Remover ${item.nome}`}
                  >
                    <Text style={styles.botaoRemoverTexto}>Remover</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          {/* Rodapé com Total e Ações (exibido mesmo vazio com total R$ 0,00) */}
          <View style={styles.rodape}>
            <View style={styles.totalLinha}>
              <Text style={styles.totalLabel}>Total do Pedido:</Text>
              <Text style={styles.totalValor}>{formatarPreco(total)}</Text>
            </View>

            {itens.length > 0 && (
              <View style={styles.acoesContainer}>
                {/* Botão Cancelar Todo o Pedido */}
                <TouchableOpacity
                  onPress={onCancelarTudo}
                  style={styles.botaoCancelarPedido}
                  activeOpacity={0.8}
                >
                  <Text style={styles.botaoCancelarTexto}>Cancelar Pedido</Text>
                </TouchableOpacity>

                {/* Botão Confirmar / Finalizar */}
                <TouchableOpacity
                  onPress={onFinalizar}
                  style={styles.botaoConfirmar}
                  activeOpacity={0.85}
                >
                  <Text style={styles.botaoConfirmarTexto}>Finalizar Pedido</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  containerModal: {
    backgroundColor: '#fffdf7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '82%',
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e3c4',
    backgroundColor: '#ffe18c',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e50021',
  },
  subtituloModal: {
    fontSize: 12,
    color: '#634700',
    marginTop: 2,
    fontWeight: '600',
  },
  botaoFechar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2ba55',
  },
  botaoFecharTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#634700',
  },
  listaConteudo: {
    padding: 16,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0e3c4',
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemNome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2d1800',
  },
  itemPrecoUnitario: {
    fontSize: 13,
    color: '#7c5912',
    marginTop: 4,
  },
  itemSubtotal: {
    fontWeight: 'bold',
    color: '#e50021',
  },
  botaoRemover: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  botaoRemoverTexto: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: 'bold',
  },
  vazioContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vazioEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  vazioTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#634700',
    marginBottom: 6,
  },
  vazioSubtexto: {
    fontSize: 13,
    color: '#8b6f30',
    textAlign: 'center',
    lineHeight: 18,
  },
  rodape: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0e3c4',
    backgroundColor: '#fffdf7',
  },
  totalLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d1800',
  },
  totalValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e50021',
  },
  acoesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoCancelarPedido: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  botaoCancelarTexto: {
    color: '#4b5563',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botaoConfirmar: {
    flex: 1.4,
    backgroundColor: '#16a34a',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoConfirmarTexto: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
