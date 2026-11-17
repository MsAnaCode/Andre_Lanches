# André Lanches — Aplicativo Mobile (React Native + Expo)

Modernização completa do site estático original do **André Lanches** (`Site Lanches/`) para um aplicativo mobile multiplataforma (**iOS e Android**) desenvolvido em **React Native com Expo (JavaScript)**, com suporte opcional ao **Supabase** e modo local automático.

---

## Estrutura do Projeto

```text
Andre_Lanches/
├── Site Lanches/                 # Projeto HTML/CSS estático original (referência)
├── assets/images/                # Imagens do cardápio, logo, banner e telefone
├── src/
│   ├── config/supabaseConfig.js  # Leitura das variáveis EXPO_PUBLIC_SUPABASE_*
│   ├── data/produtosData.js      # Cardápio fiel ao site original + promoções e telefone
│   ├── services/api.js           # Promises, async/await, fallback local e REST Supabase
│   └── components/
│       ├── Header.jsx            # Logo à esquerda + navegação "Lanches", "Sobre Nós", "Contato"
│       ├── BannerPromocao.jsx    # Banner reutilizável via props + timer com cleanup
│       ├── ListaProdutos.jsx     # Cardápio com ScrollView, filtros e Flexbox responsivo
│       ├── SobreNos.jsx          # História, missão, diferenciais (prop children) e relógio
│       ├── Contato.jsx           # Formulário (TextInput), rascunho (useEffect) e Alert.alert
│       └── EntregaFlutuante.jsx  # Botão fixo na base com Linking.openURL('tel:...')
├── supabase/schema.sql           # Tabelas e seed SQL para o Supabase
├── .env.example                  # Modelo de credenciais do Supabase
├── App.jsx                       # Componente raiz (SafeAreaView + estado de navegação)
└── App.js                        # Ponto de entrada compatível com o template Expo
```

---

## Como Rodar e Testar no iPhone (Expo Go)

1. Instale as dependências (caso ainda não estejam instaladas):
   ```bash
   npm install
   ```
2. Certifique-se de ter o aplicativo **Expo Go** instalado no iPhone (via App Store).
3. Inicie o servidor de desenvolvimento do Expo (deixe computador e iPhone na mesma rede Wi-Fi, ou use `--tunnel` caso estejam em redes diferentes):
   ```bash
   npx expo start
   ```
   *(Alternativa se o Wi-Fi da rede bloquear conexões locais: `npx expo start --tunnel`)*
4. Abra a câmera do iPhone (ou o app Expo Go) e escaneie o **QR Code** exibido no terminal.

---

## Como Configurar as Credenciais do Supabase (Opcional)

O app já funciona 100% em modo local sem nenhuma configuração extra. Para conectar ao seu banco **Supabase**:

1. Acesse o painel do seu projeto no [Supabase](https://supabase.com/), abra o **SQL Editor** e execute todo o conteúdo do arquivo [`supabase/schema.sql`](supabase/schema.sql).
2. Copie o arquivo `.env.example` para `.env` na raiz do projeto:
   ```bash
   cp .env.example .env
   ```
3. Edite o `.env` e preencha com a URL e a chave pública (`anon`) encontradas em **Project Settings > API**:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
   ```
4. Reinicie o servidor Expo limpando o cache para carregar o `.env`:
   ```bash
   npx expo start -c
   ```
   Quando conectado, o selo acima do cardápio exibirá **`Supabase Online`** e as mensagens/pedidos serão gravados diretamente nas tabelas `mensagens_contato` e `pedidos`.

---

## Publicação no GitHub e Expo (Parte 4)

### 1. Subir para o GitHub
Crie um repositório público no GitHub (ex.: `andre-lanches-app`) e conecte o repositório local:
```bash
git remote add origin https://github.com/SEU-USUARIO/andre-lanches-app.git
git push -u origin main
```

### 2. Publicar Preview no Expo (EAS Update)
```bash
npm install -g eas-cli
eas login
eas update:configure
eas update --branch preview --message "Versão final André Lanches Mobile"
```
