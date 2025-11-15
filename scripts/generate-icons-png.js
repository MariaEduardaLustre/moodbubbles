// Script para gerar ícones PNG do PWA
// Execute: node scripts/generate-icons-png.js

const fs = require('fs');
const path = require('path');

// Verificar se sharp está disponível
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('⚠️  Sharp não está instalado. Instalando...');
  console.log('Execute: npm install --save-dev sharp');
  console.log('');
  console.log('Ou use o arquivo scripts/create-icons.html no navegador para gerar os ícones manualmente.');
  process.exit(1);
}

const publicDir = path.join(__dirname, '..', 'public');

// SVG template
const iconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100">
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

async function generateIcons() {
  try {
    const svgBuffer = Buffer.from(iconSVG);
    
    // Gerar icon-192.png
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192.png'));
    
    console.log('✅ icon-192.png criado!');
    
    // Gerar icon-512.png
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512.png'));
    
    console.log('✅ icon-512.png criado!');
    console.log('');
    console.log('🎉 Ícones gerados com sucesso na pasta public/');
    
  } catch (error) {
    console.error('❌ Erro ao gerar ícones:', error.message);
    console.log('');
    console.log('💡 Alternativa: Use o arquivo scripts/create-icons.html no navegador');
  }
}

generateIcons();

