# 📱 Relatório do Projeto: André Lanches Mobile

## 1. 👥 Desenvolvedores
* **Ana Clara de Paulo Arantes Sousa**
* **Carlos Eduardo Mendonça de Morais**

---

## 2. 🍔 Do que se trata o projeto?
O projeto **André Lanches** consiste na modernização de um site estático pré-existente (desenvolvido em HTML e CSS voltado para desktop) para um **aplicativo móvel moderno, responsivo e funcional** construído com **React Native e Expo**.

O objetivo principal foi transformar a experiência de cardápio tradicional em uma interface nativa pensada especialmente para smartphones (*mobile-first*), trazendo:
* **Identidade Visual Preservada e Otimizada:** Adaptação da paleta de cores (vermelho `#e50021`, amarelo `#ffe18c`, bege `#fff8e1`), logotipo e imagens de lanches, porções e bebidas.
* **Componentização Modular:** Criação de componentes funcionais desacoplados e reutilizáveis:
  * `Header.jsx`: Cabeçalho com logo, identificação da marca, botão interativo para o carrinho e abas de navegação.
  * `BannerPromocao.jsx`: Banner de oferta em destaque com cronômetro regressivo dinâmico.
  * `ListaProdutos.jsx`: Listagem com filtros por categoria ("Todos", "Lanches", "Porções", "Bebidas") e layout em cards responsivos.
  * `SobreNos.jsx`: História, missão e diferenciais da lanchonete organizados com composição via `children`.
  * `Contato.jsx`: Formulário interativo com validação e envio com alerta nativo.
  * `EntregaFlutuante.jsx`: Ação rápida na base da tela conectada diretamente ao discador telefônico do aparelho via `Linking.openURL`.
  * `CarrinhoModal.jsx`: Modal de pedidos que permite acompanhar os itens selecionados em tempo real, calcular o total da compra e cancelar/remover itens de forma prática.
* **Integração Backend Híbrida (Opcional):** Suporte nativo ao **Supabase** via API REST com fallback inteligente para dados locais, garantindo disponibilidade contínua em qualquer cenário.

---

## 3. 🧗 Dificuldades Encontradas e Soluções Implementadas

Durante o ciclo de desenvolvimento da aplicação mobile, a equipe enfrentou alguns desafios principais:

1. **Adaptação do Layout Desktop para Telas Mobile (*Mobile-First*):**
   * *Dificuldade:* O projeto HTML original possuía diagramação horizontal e fontes fixas pensadas para monitores, o que causava quebras visuais em telas menores.
   * *Solução:* Foi feita uma reestruturação baseada no modelo Flexbox do React Native, utilizando `Dimensions`, `flexWrap`, espaçamentos proporcionais e `SafeAreaView` para contornar áreas críticas como *notches* e a barra de status tanto no Android quanto no iOS.

2. **Fluxo de Seleção e Gerenciamento de Estado do Carrinho:**
   * *Dificuldade:* A proposta inicial disparava alertas nativos a cada clique, o que prejudicava a fluidez da navegação ao escolher mais de um item. Além disso, era necessário manter o controle das quantidades somadas, cálculo dinâmico de subtotais e possibilitar o cancelamento do pedido.
   * *Solução:* Centralização do estado `itensPedido` no componente raiz (`App.jsx`), permitindo uma experiência fluida onde o usuário escolhe seus lanches silenciosamente e pode conferir ou cancelar pedidos diretamente ao clicar no botão do carrinho no topo da tela.

3. **Compatibilidade com Recursos Nativos do Smartphone (Discagem e Formulários):**
   * *Dificuldade:* Ao acionar chamadas telefônicas via `Linking`, ambientes de emulador desktop frequentemente geram erros por não possuírem serviço celular ativo.
   * *Solução:* Implementação de verificações prévias com `Linking.canOpenURL` e tratamento com `try/catch` amigável para o usuário, permitindo testar em dispositivos físicos sem travar o aplicativo.

4. **Gerenciamento de Ciclo de Vida e Limpeza de Efeitos (`useEffect`):**
   * *Dificuldade:* Timers (como o relógio da tela "Sobre Nós" e o contador regressivo do banner) e requisições assíncronas poderiam provocar vazamentos de memória (*memory leaks*) ao alternar rapidamente entre abas.
   * *Solução:* Aplicação rigorosa de funções de *cleanup* (`clearInterval` e flags de cancelamento de requisições) em todos os hooks `useEffect`.

---

## 4. 🚀 Conclusão
A transição do André Lanches para o ecossistema React Native demonstrou na prática os benefícios de uma interface declarativa, oferecendo performance nativa, navegação intuitiva e facilidade para futuras expansões do negócio no ambiente mobile.
