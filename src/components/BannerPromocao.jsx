import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Formata segundos restantes no padrão MM:SS.
 * @param {number} totalSegundos
 * @returns {string}
 */
function formatarCronometro(totalSegundos) {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

/**
 * Banner reutilizável de promoção (Aula 06 — Props via destructuring).
 * Inclui cronômetro regressivo com useEffect + cleanup clearInterval (Aula 08).
 */
export default function BannerPromocao({
  titulo = 'Promoção!',
  descricao = 'X-Salada + Batata',
  subtitulo = 'Combo campeão da casa com batata crocante na hora',
  preco = '9,90',
  selo = 'COMBO DO DIA',
  imagem,
  onAproveitar,
}) {
  const [segundosRestantes, setSegundosRestantes] = useState(15 * 60);

  useEffect(() => {
    const id = setInterval(() => {
      setSegundosRestantes((atual) => (atual > 1 ? atual - 1 : 15 * 60));
    }, 1000);

    // Cleanup obrigatório (Aula 08) para evitar vazamento de memória ao desmontar
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={imagem}
        style={styles.bannerFundo}
        imageStyle={styles.bannerImagem}
        resizeMode="cover"
      >
        <View style={styles.camadaEscura}>
          <View style={styles.linhaTopo}>
            {Boolean(selo) && (
              <View style={styles.seloPill}>
                <Text style={styles.seloTexto}>{selo}</Text>
              </View>
            )}
            <View style={styles.timerPill}>
              <Text style={styles.timerTexto}>Oferta expira em {formatarCronometro(segundosRestantes)}</Text>
            </View>
          </View>

          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.descricao}>{descricao}</Text>
          {Boolean(subtitulo) && <Text style={styles.subtitulo}>{subtitulo}</Text>}

          <View style={styles.rodapeBanner}>
            {/* Text aninhado (Aula 10) para destacar o valor */}
            <Text style={styles.precoBase}>
              Por apenas{' '}
              <Text style={styles.precoDestaque}>R$ {preco}</Text>
            </Text>

            {onAproveitar && (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onAproveitar}
                style={styles.botaoAproveitar}
              >
                <Text style={styles.botaoAproveitarTexto}>Pedir Combo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  bannerFundo: {
    width: '100%',
    minHeight: 196,
    justifyContent: 'flex-end',
  },
  bannerImagem: {
    borderRadius: 16,
  },
  camadaEscura: {
    backgroundColor: 'rgba(18, 12, 8, 0.62)',
    padding: 16,
    minHeight: 196,
    justifyContent: 'space-between',
  },
  linhaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  seloPill: {
    backgroundColor: '#e50021',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  seloTexto: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
  timerPill: {
    backgroundColor: 'rgba(255, 225, 140, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  timerTexto: {
    color: '#5c2d00',
    fontSize: 11,
    fontWeight: 'bold',
  },
  titulo: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
    textShadowColor: '#e50021',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  descricao: {
    color: '#ffe18c',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  subtitulo: {
    color: '#f3f4f6',
    fontSize: 13,
    marginTop: 2,
  },
  rodapeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  precoBase: {
    color: '#ffffff',
    fontSize: 14,
  },
  precoDestaque: {
    color: '#ffe18c',
    fontSize: 24,
    fontWeight: 'bold',
  },
  botaoAproveitar: {
    backgroundColor: '#e50021',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffe18c',
  },
  botaoAproveitarTexto: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
