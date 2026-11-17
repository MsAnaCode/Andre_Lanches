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
import { PROMOCAO_PRINCIPAL, TELEFONE_ENTREGA } from './src/data/produtosData';
import { registrarPedidoRapido } from './src/services/api';

/**
 * Componente raiz do aplicativo André Lanches.
 * - Gerencia a tela ativa via useState ("Lanches", "Sobre Nós", "Contato")
 * - Envolve a interface em SafeAreaView (com ajuste de StatusBar no Android)
 * - Estrutura Cabeçalho / Corpo (flex: 1) / Botão Flutuante (Aula 11)
 */
export default function App() {
  const [abaAtiva, setAbaAtiva] = useState('Lanches');
  const [quantidadePedidos, setQuantidadePedidos] = useState(0);

  function handleSelecionarProduto(item) {
    setQuantidadePedidos((anterior) => anterior + 1);

    // Consumo de Promise com .then/.catch/.finally (Aula 04)
    registrarPedidoRapido(item)
      .then((registro) => {
        Alert.alert(
          'Item selecionado!',
          `${item.nome} (${item.precoFormatado || `R$ ${PROMOCAO_PRINCIPAL.precoFormatado}`}) adicionado ao seu pedido rápido (${registro.idPedido}).\n\nDeseja ligar agora para finalizar a entrega?`,
          [
            { text: 'Continuar no cardápio', style: 'cancel' },
            {
              text: 'Ligar agora',
              onPress: () => Linking.openURL(TELEFONE_ENTREGA.numeroDiscagem).catch(() => {}),
            },
          ]
        );
      })
      .catch((erro) => {
        console.error('Erro ao registrar pedido rápido:', erro);
      });
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
        quantidadePedidos={quantidadePedidos}
      />

      <View style={styles.corpo}>{renderizarConteudo()}</View>

      <EntregaFlutuante
        numeroExibicao={TELEFONE_ENTREGA.numeroExibicao}
        numeroDiscagem={TELEFONE_ENTREGA.numeroDiscagem}
        mensagem={TELEFONE_ENTREGA.mensagem}
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
