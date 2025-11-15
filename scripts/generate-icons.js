// Script para gerar ícones do PWA
// Execute: node scripts/generate-icons.js

const fs = require('fs');
const path = require('path');

// SVG template para o ícone
const iconSVG = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B0E0E6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="45" fill="url(#grad)"/>
  <circle cx="35" cy="35" r="12" fill="#fff" opacity="0.8"/>
  <circle cx="65" cy="40" r="8" fill="#fff" opacity="0.6"/>
  <circle cx="45" cy="65" r="6" fill="#fff" opacity="0.7"/>
</svg>
`;

// Criar diretório public se não existir
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Salvar SVG temporário
const tempSVG192 = path.join(publicDir, 'icon-192-temp.svg');
const tempSVG512 = path.join(publicDir, 'icon-512-temp.svg');

fs.writeFileSync(tempSVG192, iconSVG(192));
fs.writeFileSync(tempSVG512, iconSVG(512));

console.log('✅ Ícones SVG criados!');
console.log('');
console.log('⚠️  Para converter para PNG, você pode:');
console.log('1. Abrir os arquivos icon-192-temp.svg e icon-512-temp.svg em um editor de imagens');
console.log('2. Exportar como PNG nos tamanhos 192x192 e 512x512');
console.log('3. Salvar como icon-192.png e icon-512.png na pasta public/');
console.log('');
console.log('Ou use uma ferramenta online como: https://convertio.co/svg-png/');

