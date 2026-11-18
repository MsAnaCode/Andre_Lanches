import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';
import ListaProdutos from './src/components/ListaProdutos';
import SobreNos from './src/components/SobreNos';
import Contato from './src/components/Contato';
import EntregaFlutuante from './src/components/EntregaFlutuante';
import CarrinhoModal from './src/components/CarrinhoModal';
import { PROMOCAO_PRINCIPAL, TELEFONE_ENTREGA } from './src/data/produtosData';
import { registrarPedidoRapido } from './src/services/api';

/**
 * Componente raiz do aplicativo André Lanches.
 * - Gerencia a tela ativa via useState ("Lanches", "Sobre Nós", "Contato")
 * - Envolve a interface em SafeAreaView (com ajuste de StatusBar no Android)
 * - Estrutura Cabeçalho / Corpo (flex: 1) / Botão Flutuante (Aula 11)
 * - Gerencia itens do pedido/carrinho com visualização e cancelamento
 */
export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('Lanches');
  const [itensPedido, setItensPedido] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  const quantidadeTotalItens = itensPedido.reduce((acc, item) => acc + item.quantidade, 0);

  function handleSelecionarProduto(item) {
    const itemPreco = Number(item.preco) || 0;

    setItensPedido((anteriores) => {
      const existente = anteriores.find((p) => p.id === item.id);
      if (existente) {
        return anteriores.map((p) =>
          p.id === item.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [
        ...anteriores,
        {
          id: item.id,
          nome: item.nome,
          preco: itemPreco,
          precoFormatado: item.precoFormatado || `R$ ${itemPreco.toFixed(2).replace('.', ',')}`,
          quantidade: 1,
        },
      ];
    });

    // Registra silenciosamente no backend/Supabase sem interromper com pop-up
    registrarPedidoRapido(item).catch((erro) => {
      console.warn('Erro ao sincronizar pedido rápido:', erro);
    });
  }

  function handleRemoverItem(id) {
    setItensPedido((anteriores) =>
      anteriores
        .map((p) => (p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p))
        .filter((p) => p.quantidade > 0)
    );
  }

  function handleCancelarTudo() {
    Alert.alert(
      'Cancelar pedido',
      'Tem certeza de que deseja esvaziar o carrinho e cancelar todos os itens selecionados?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar tudo',
          style: 'destructive',
          onPress: () => {
            setItensPedido([]);
            setCarrinhoAberto(false);
            Alert.alert('Cancelado', 'Seu pedido foi cancelado com sucesso.');
          },
        },
      ]
    );
  }

  function handleFinalizarPedido() {
    setCarrinhoAberto(false);
    Alert.alert(
      'Quase lá! 🎉',
      `Você tem ${quantidadeTotalItens} item(ns) selecionado(s).\n\nDeseja ligar diretamente para nossa entrega ou enviar seus dados por mensagem?`,
      [
        {
          text: 'Ligar para Entrega',
          onPress: () => Linking.openURL(TELEFONE_ENTREGA.numeroDiscagem).catch(() => {}),
        },
        {
          text: 'Enviar Mensagem',
          onPress: () => setAbaAtiva('Contato'),
        },
        { text: 'Voltar', style: 'cancel' },
      ]
    );
  }

  function renderizarConteudo() {
    if (abaAtiva === 'Sobre Nós') {
      return <SobreNos />;
    }

    if (abaAtiva === 'Contato') {
      return <Contato />;
    }

    return (
      <ListaProdutos
        onSelecionarProduto={handleSelecionarProduto}
        bannerProps={{
          titulo: PROMOCAO_PRINCIPAL.titulo,
          descricao: PROMOCAO_PRINCIPAL.descricao,
          subtitulo: PROMOCAO_PRINCIPAL.subtitulo,
          preco: PROMOCAO_PRINCIPAL.precoFormatado,
          selo: PROMOCAO_PRINCIPAL.selo,
          imagem: PROMOCAO_PRINCIPAL.imagem,
          onAproveitar: () =>
            handleSelecionarProduto({
              id: PROMOCAO_PRINCIPAL.id,
              nome: `${PROMOCAO_PRINCIPAL.titulo} ${PROMOCAO_PRINCIPAL.descricao}`,
              preco: PROMOCAO_PRINCIPAL.preco,
              precoFormatado: `R$ ${PROMOCAO_PRINCIPAL.precoFormatado}`,
            }),
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#ffe18c" />

      <Header
        abaAtiva={abaAtiva}
        onMudarAba={setAbaAtiva}
        quantidadePedidos={quantidadeTotalItens}
        onAbrirCarrinho={() => setCarrinhoAberto(true)}
      />

      <View style={styles.corpo}>{renderizarConteudo()}</View>

      <EntregaFlutuante
        numeroExibicao={TELEFONE_ENTREGA.numeroExibicao}
        numeroDiscagem={TELEFONE_ENTREGA.numeroDiscagem}
        mensagem={TELEFONE_ENTREGA.mensagem}
      />

      <CarrinhoModal
        visivel={carrinhoAberto}
        itens={itensPedido}
        onFechar={() => setCarrinhoAberto(false)}
        onRemoverItem={handleRemoverItem}
        onCancelarTudo={handleCancelarTudo}
        onFinalizar={handleFinalizarPedido}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffe18c',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0,
  },
  corpo: {
    flex: 1,
    backgroundColor: '#fff8e1',
  },
});
