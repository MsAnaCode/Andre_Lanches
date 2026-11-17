import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { enviarMensagemContato } from '../services/api';

const ASSUNTOS = ['Dúvida', 'Pedido Especial', 'Elogio / Sugestão'];

/**
 * Tela "Contato" com formulário funcional (TextInput + Alert.alert).
 * - Observa mudanças do rascunho via useEffect com array de dependências [nome, contato, mensagem] (Aula 08)
 * - Envio assíncrono com async/await e try/catch/finally (Aula 04)
 */
export default function Contato() {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [assunto, setAssunto] = useState('Dúvida');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [rascunhoAtivo, setRascunhoAtivo] = useState(false);

  // Reage às mudanças de estado do formulário (Aula 08 — useEffect com dependências)
  useEffect(() => {
    const temConteudo =
      nome.trim().length > 0 || contato.trim().length > 0 || mensagem.trim().length > 0;
    setRascunhoAtivo(temConteudo);
  }, [nome, contato, mensagem]);

  async function handleEnviar() {
    if (!nome.trim() || !contato.trim() || !mensagem.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Por favor, preencha seu nome, e-mail/WhatsApp e sua mensagem antes de enviar.'
      );
      return;
    }

    setEnviando(true);
    try {
      const resultado = await enviarMensagemContato({
        nome,
        contato,
        assunto,
        mensagem,
      });

      const origemTexto =
        resultado.origem === 'supabase'
          ? 'Salvo no banco Supabase com sucesso.'
          : 'Recebido com sucesso pelo atendimento local.';

      Alert.alert(
        'Mensagem enviada!',
        `Obrigado, ${nome.trim()}!\n\nProtocolo: ${resultado.protocolo}\nAssunto: ${assunto}\n${origemTexto}\n\nNossa equipe responderá em breve pelo contato informado (${contato.trim()}).`
      );

      setNome('');
      setContato('');
      setMensagem('');
      setAssunto('Dúvida');
    } catch (erro) {
      Alert.alert(
        'Erro ao enviar',
        `Não foi possível enviar sua mensagem agora: ${erro.message}`
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.conteudoScroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cartao}>
          <View style={styles.cabecalhoForm}>
            <Text style={styles.titulo}>Fale Conosco</Text>
            {rascunhoAtivo && (
              <View style={styles.rascunhoBadge}>
                <Text style={styles.rascunhoTexto}>Rascunho em edição</Text>
              </View>
            )}
          </View>

          <Text style={styles.subtitulo}>
            Dúvidas sobre o cardápio, pedidos para eventos ou sugestões? Mande sua mensagem!
          </Text>

          {/* Seletor rápido de assunto */}
          <Text style={styles.label}>Assunto</Text>
          <View style={styles.assuntosLinha}>
            {ASSUNTOS.map((item) => {
              const ativo = assunto === item;
              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() => setAssunto(item)}
                  style={[styles.assuntoPill, ativo && styles.assuntoPillAtivo]}
                >
                  <Text style={[styles.assuntoTexto, ativo && styles.assuntoTextoAtivo]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Seu Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Carlos Eduardo"
            placeholderTextColor="#9ca3af"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />

          <Text style={styles.label}>E-mail ou WhatsApp</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: carlos@email.com ou (11) 99999-9999"
            placeholderTextColor="#9ca3af"
            value={contato}
            onChangeText={setContato}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Mensagem</Text>
          <TextInput
            style={[styles.input, styles.inputMultilinha]}
            placeholder="Escreva aqui sua dúvida, pedido ou sugestão..."
            placeholderTextColor="#9ca3af"
            value={mensagem}
            onChangeText={setMensagem}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleEnviar}
            disabled={enviando}
            style={[styles.botaoEnviar, enviando && styles.botaoDesabilitado]}
          >
            {enviando ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.botaoEnviarTexto}>Enviar Mensagem</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoExtraCard}>
          <Text style={styles.infoExtraTitulo}>Endereço da Lanchonete</Text>
          <Text style={styles.infoExtraTexto}>
            Rua dos Lanches Artesanais, 420 — Centro • Atendimento presencial e delivery todos os dias.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  conteudoScroll: {
    padding: 16,
    paddingBottom: 116,
    gap: 14,
  },
  cartao: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fde68a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  cabecalhoForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#e50021',
  },
  rascunhoBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  rascunhoTexto: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#92400e',
  },
  subtitulo: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 19,
    marginTop: 4,
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 6,
    marginTop: 10,
  },
  assuntosLinha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  assuntoPill: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  assuntoPillAtivo: {
    backgroundColor: '#e50021',
    borderColor: '#e50021',
  },
  assuntoTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9a3412',
  },
  assuntoTextoAtivo: {
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#111827',
  },
  inputMultilinha: {
    minHeight: 105,
    paddingTop: 12,
  },
  botaoEnviar: {
    backgroundColor: '#e50021',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    shadowColor: '#e50021',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoEnviarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoExtraCard: {
    backgroundColor: '#fffbeb',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  infoExtraTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#9a3412',
  },
  infoExtraTexto: {
    fontSize: 13,
    color: '#57534e',
    marginTop: 4,
    lineHeight: 19,
  },
});
