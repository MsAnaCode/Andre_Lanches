import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IMAGENS_APP } from '../data/produtosData';

/**
 * Componente de composição reutilizável utilizando a prop especial `children`
 * (Aula 06) e combinação de estilos em array (Aula 10).
 */
function CaixaSecao({ titulo, subtitulo, children, destaque = false }) {
  return (
    <View style={[styles.caixa, destaque && styles.caixaDestaque]}>
      <Text style={styles.caixaTitulo}>{titulo}</Text>
      {Boolean(subtitulo) && <Text style={styles.caixaSubtitulo}>{subtitulo}</Text>}
      <View style={styles.caixaConteudo}>{children}</View>
    </View>
  );
}

const DIFERENCIAIS = [
  {
    titulo: 'Hambúrguer na Chapa na Hora',
    texto: 'Carnes selecionadas e prensadas no momento do pedido, garantindo suculência e ponto perfeito.',
  },
  {
    titulo: 'Maionese Verde Artesanal',
    texto: 'Receita secreta da família preparada diariamente com ervas frescas.',
  },
  {
    titulo: 'Preço Justo de Verdade',
    texto: 'Lanches completos que cabem no bolso, do clássico X-Burguer de R$ 1,50 ao gigante Big Tower.',
  },
  {
    titulo: 'Entrega Ágil na Sua Casa',
    texto: 'Embalagem térmica reforçada para o lanche chegar quentinho e a batata crocante.',
  },
];

/**
 * Tela "Sobre Nós" do André Lanches.
 * Apresenta história, missão, diferenciais e relógio ao vivo com useEffect + cleanup (Aula 08).
 */
export default function SobreNos() {
  const [horaAtual, setHoraAtual] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setHoraAtual(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const horaFormatada = horaAtual.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.conteudoScroll}
      showsVerticalScrollIndicator={false}
    >
      {/* Cartão de apresentação com logo e horário em tempo real */}
      <View style={styles.heroCard}>
        <Image source={IMAGENS_APP.logo} style={styles.heroLogo} resizeMode="contain" />
        <View style={styles.heroTextos}>
          <Text style={styles.heroTitulo}>André Lanches</Text>
          <Text style={styles.heroSubtitulo}>Desde 2014 servindo lanches memoráveis</Text>
          <View style={styles.relogioPill}>
            <Text style={styles.relogioTexto}>Atendimento ao vivo • {horaFormatada}</Text>
          </View>
        </View>
      </View>

      {/* Uso do componente CaixaSecao com children (Aula 06) */}
      <CaixaSecao
        titulo="Nossa História"
        subtitulo="Do carrinho de bairro ao seu smartphone"
        destaque
      >
        <Text style={styles.paragrafo}>
          Tudo começou em 2014 com uma chapa quente, receitas de família e o sonho do Seu André de
          oferecer o melhor lanche artesanal da região por um preço acessível.
        </Text>
        <Text style={styles.paragrafoEspacado}>
          O que nasceu como um ponto de encontro de amigos virou referência de sabor, rapidez e
          generosidade em cada mordida — agora também na palma da sua mão.
        </Text>
      </CaixaSecao>

      <CaixaSecao titulo="Nossa Missão" subtitulo="Sabor honesto em cada pedido">
        <Text style={styles.paragrafo}>
          Transformar a hora da fome em um momento de alegria, entregando lanches preparados com
          <Text style={styles.textoNegrito}> ingredientes frescos</Text>, atendimento acolhedor e
          velocidade de entrega que respeita o seu tempo.
        </Text>
      </CaixaSecao>

      <CaixaSecao titulo="Nossos Diferenciais" subtitulo="Por que todo mundo volta">
        {DIFERENCIAIS.map((item, indice) => (
          <View
            key={item.titulo}
            style={[
              styles.diferencialItem,
              indice < DIFERENCIAIS.length - 1 && styles.diferencialComDivisor,
            ]}
          >
            <Text style={styles.diferencialTitulo}>• {item.titulo}</Text>
            <Text style={styles.diferencialTexto}>{item.texto}</Text>
          </View>
        ))}
      </CaixaSecao>

      <CaixaSecao titulo="Horário de Funcionamento" subtitulo="Chapa ligada todos os dias">
        <View style={styles.horarioLinha}>
          <Text style={styles.horarioDia}>Segunda a Quinta</Text>
          <Text style={styles.horarioHora}>18h00 às 23h30</Text>
        </View>
        <View style={styles.horarioLinha}>
          <Text style={styles.horarioDia}>Sexta, Sábado e Domingo</Text>
          <Text style={styles.horarioHora}>18h00 às 01h00</Text>
        </View>
      </CaixaSecao>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  conteudoScroll: {
    padding: 16,
    paddingBottom: 116,
    gap: 14,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e50021',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  heroLogo: {
    width: 68,
    height: 68,
    marginRight: 14,
  },
  heroTextos: {
    flex: 1,
  },
  heroTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e50021',
  },
  heroSubtitulo: {
    fontSize: 13,
    color: '#4b5563',
    marginTop: 2,
  },
  relogioPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },
  relogioTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400e',
  },
  caixa: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  caixaDestaque: {
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b',
    borderWidth: 1.5,
  },
  caixaTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#e50021',
  },
  caixaSubtitulo: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9a3412',
    marginTop: 2,
    marginBottom: 10,
  },
  caixaConteudo: {
    marginTop: 2,
  },
  paragrafo: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 21,
  },
  paragrafoEspacado: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 21,
    marginTop: 8,
  },
  textoNegrito: {
    fontWeight: 'bold',
    color: '#111827',
  },
  diferencialItem: {
    paddingVertical: 8,
  },
  diferencialComDivisor: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  diferencialTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  diferencialTexto: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 19,
    marginTop: 3,
  },
  horarioLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  horarioDia: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  horarioHora: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e50021',
  },
});
