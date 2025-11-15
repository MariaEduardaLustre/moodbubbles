# 💭 Mood Bubbles

Um aplicativo simples e viciantemente relaxante para estourar bolhas e descarregar o estresse.

## ✨ Características

- 🫧 **Bolhas coloridas** que sobem pela tela
- 🔊 **Sons suaves** ao estourar cada bolha
- 🎨 **5 humores diferentes** com paletas de cores únicas:
  - Calmo (azuis suaves)
  - Feliz (amarelos e rosas)
  - Energético (laranjas e magentas)
  - Sonhador (roxos e lavandas)
  - Zen (verdes suaves)
- ⛈️ **Modo Tempestade**: Muitas bolhas rapidamente
- 🧘 **Modo Zen**: Movimento lento e relaxante
- 📱 **Vibração leve** no toque (dispositivos móveis)
- 📲 **PWA** - Pode ser instalado no celular como app nativo!

## 🚀 Como usar (Desenvolvimento)

1. Instale as dependências:
```bash
npm install
```

2. Gere os ícones do aplicativo:
   - Abra o arquivo `scripts/create-icons.html` no navegador
   - Clique em "Gerar Ícones" e baixe os arquivos PNG
   - Coloque `icon-192.png` e `icon-512.png` na pasta `public/`

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

5. Escolha seu humor e modo, e comece a estourar bolhas!

## 📱 Como instalar no celular (PWA)

### Android (Chrome):
1. Abra o aplicativo no navegador Chrome do seu celular
2. Toque no menu (três pontos) no canto superior direito
3. Selecione "Adicionar à tela inicial" ou "Instalar app"
4. Confirme a instalação
5. O app aparecerá na sua tela inicial como um aplicativo normal!

### iOS (Safari):
1. Abra o aplicativo no navegador Safari do seu iPhone/iPad
2. Toque no botão de compartilhar (quadrado com seta para cima)
3. Role para baixo e toque em "Adicionar à Tela de Início"
4. Personalize o nome se desejar e toque em "Adicionar"
5. O app aparecerá na sua tela inicial!

### Publicar online:
Para que outras pessoas possam instalar o app, você precisa publicá-lo online:

1. Faça o build de produção:
```bash
npm run build
```

2. Os arquivos estarão na pasta `dist/`

3. Publique a pasta `dist/` em um serviço de hospedagem como:
   - **Netlify** (gratuito): https://www.netlify.com
   - **Vercel** (gratuito): https://vercel.com
   - **GitHub Pages**: https://pages.github.com
   - **Firebase Hosting**: https://firebase.google.com/docs/hosting

4. Depois de publicado, qualquer pessoa pode acessar o link e instalar o app no celular!

## 🛠️ Tecnologias

- React 18
- TypeScript
- Vite
- PWA (Progressive Web App)
- Web Audio API (para sons)
- Vibration API (para feedback tátil)

## 📝 Scripts

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run generate-icons` - Gera templates de ícones SVG

---

Perfeito para desligar a mente por 1 minuto! 🧘‍♀️

