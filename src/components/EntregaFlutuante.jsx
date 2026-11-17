import React from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IMAGENS_APP, TELEFONE_ENTREGA } from '../data/produtosData';

/**
 * Botão flutuante fixo na base da tela (position: 'absolute').
 * Aciona o discador nativo do smartphone via Linking.openURL('tel:+55...').
 */
export default function EntregaFlutuante({
  numeroExibicao = TELEFONE_ENTREGA.numeroExibicao,
  numeroDiscagem = TELEFONE_ENTREGA.numeroDiscagem,
  mensagem = TELEFONE_ENTREGA.mensagem,
}) {
  async function handleLigar() {
    try {
      const suportado = await Linking.canOpenURL(numeroDiscagem);
      if (!suportado) {
        Alert.alert(
          'Disque para o André Lanches',
          `Ligue para ${numeroExibicao} para fazer seu pedido!\n\n(Obs.: em simuladores sem chip, o discador nativo pode estar indisponível.)`
        );
        return;
      }
      await Linking.openURL(numeroDiscagem);
    } catch (erro) {
      Alert.alert(
        'Não foi possível abrir o discador',
        `Disque manualmente para ${numeroExibicao}. (${erro.message})`
      );
    }
  }

  return (
    <View style={styles.containerFlutuante} pointerEvents="box-none">
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleLigar}
        style={styles.botaoEntrega}
        accessibilityRole="button"
        accessibilityLabel={`Ligar para ${numeroExibicao}, ${mensagem}`}
      >
        <Image source={IMAGENS_APP.telefone} style={styles.iconeTelefone} resizeMode="cover" />

        <View style={styles.textosCentro}>
          <Text style={styles.numeroTexto}>{numeroExibicao}</Text>
          <Text style={styles.subtexto}>{mensagem}</Text>
        </View>

        <View style={styles.acaoBadge}>
          <Text style={styles.acaoBadgeTexto}>LIGAR</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlutuante: {
    position: 'absolute',
    bottom: 14,
    left: 16,
    right: 16,
  },
  botaoEntrega: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e50021',
    borderRadius: 999,
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 14,
    borderWidth: 2,
    borderColor: '#ffe18c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  iconeTelefone: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ffe18c',
    backgroundColor: '#ffffff',
  },
  textosCentro: {
    flex: 1,
    marginLeft: 12,
  },
  numeroTexto: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtexto: {
    color: '#ffe18c',
    fontSize: 12,
    fontWeight: '600',
  },
  acaoBadge: {
    backgroundColor: '#ffe18c',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  acaoBadgeTexto: {
    color: '#991b1b',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
