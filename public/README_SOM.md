# 🎵 Como Adicionar Som Personalizado

## 📁 Onde colocar o arquivo MP3

Coloque seu arquivo MP3 na pasta `public/` com o nome:
- **`bubble-pop.mp3`**

## 📝 Passos

1. Coloque o arquivo `bubble-pop.mp3` na pasta `public/`
2. O arquivo será automaticamente usado quando você estourar uma bolha
3. Se o arquivo não existir, o app usará o som gerado automaticamente

## ⚙️ Personalização

Se quiser usar um nome diferente ou ajustar o volume, edite o arquivo:
- `src/utils/sound.ts`

Procure por:
- `'/bubble-pop.mp3'` - para mudar o nome do arquivo
- `bubblePopAudio.volume = 0.5` - para ajustar o volume (0.0 a 1.0)

## 💡 Dicas

- Use arquivos MP3 curtos (menos de 1 segundo) para melhor performance
- Arquivos muito grandes podem causar delay
- O arquivo será carregado automaticamente quando o app iniciar

