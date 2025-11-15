// Cache do áudio para melhor performance
let bubblePopAudio: HTMLAudioElement | null = null;

// Inicializa o áudio (chamado uma vez)
function initBubblePopAudio(): HTMLAudioElement | null {
  if (bubblePopAudio) return bubblePopAudio;
  
  try {
    // Tenta carregar o arquivo MP3
    bubblePopAudio = new Audio('/bubble-pop.mp3');
    bubblePopAudio.volume = 0.5; // Volume padrão (0.0 a 1.0)
    bubblePopAudio.preload = 'auto';
    
    // Se o arquivo não existir, retorna null para usar o som gerado
    bubblePopAudio.addEventListener('error', () => {
      bubblePopAudio = null;
    });
    
    return bubblePopAudio;
  } catch (error) {
    return null;
  }
}

// Gera um som realista e "molhado" de bolha de sabão estourando usando Web Audio API (fallback)
function playBubblePopSoundGenerated(): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // 1. Ruído branco filtrado para o "pop" agudo (parte alta)
    const bufferSize = audioContext.sampleRate * 0.03; // 30ms
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const noiseGain = audioContext.createGain();
    const noiseFilter = audioContext.createBiquadFilter();
    
    // Filtro passa-banda em frequência alta para o "pop"
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 3000 + Math.random() * 1500;
    noiseFilter.Q.value = 1.5;
    
    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.25, now + 0.001);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
    
    // 2. Ruído de baixa frequência para o "splash" molhado
    const splashBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const splashOutput = splashBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      splashOutput[i] = Math.random() * 2 - 1;
    }
    
    const splashNoise = audioContext.createBufferSource();
    splashNoise.buffer = splashBuffer;
    const splashGain = audioContext.createGain();
    const splashFilter = audioContext.createBiquadFilter();
    
    // Filtro passa-baixa para frequências mais baixas (splash molhado)
    splashFilter.type = 'lowpass';
    splashFilter.frequency.value = 800 + Math.random() * 400;
    splashFilter.Q.value = 1;
    
    splashNoise.connect(splashFilter);
    splashFilter.connect(splashGain);
    splashGain.connect(audioContext.destination);
    
    splashGain.gain.setValueAtTime(0, now);
    splashGain.gain.linearRampToValueAtTime(0.2, now + 0.002);
    splashGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    // 3. Oscilador para o "ping" agudo inicial
    const pingOsc = audioContext.createOscillator();
    const pingGain = audioContext.createGain();
    
    pingOsc.type = 'sine';
    pingOsc.frequency.setValueAtTime(600 + Math.random() * 300, now);
    pingOsc.frequency.exponentialRampToValueAtTime(150, now + 0.015);
    
    pingOsc.connect(pingGain);
    pingGain.connect(audioContext.destination);
    
    pingGain.gain.setValueAtTime(0, now);
    pingGain.gain.linearRampToValueAtTime(0.15, now + 0.0005);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
    
    // 4. Oscilador de baixa frequência para o "thump" molhado
    const thumpOsc = audioContext.createOscillator();
    const thumpGain = audioContext.createGain();
    
    thumpOsc.type = 'sine';
    thumpOsc.frequency.setValueAtTime(150 + Math.random() * 50, now);
    thumpOsc.frequency.exponentialRampToValueAtTime(50, now + 0.03);
    
    thumpOsc.connect(thumpGain);
    thumpGain.connect(audioContext.destination);
    
    thumpGain.gain.setValueAtTime(0, now);
    thumpGain.gain.linearRampToValueAtTime(0.1, now + 0.003);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    // Iniciar todos os sons
    whiteNoise.start(now);
    whiteNoise.stop(now + 0.03);
    
    splashNoise.start(now);
    splashNoise.stop(now + 0.05);
    
    pingOsc.start(now);
    pingOsc.stop(now + 0.015);
    
    thumpOsc.start(now);
    thumpOsc.stop(now + 0.05);
    
  } catch (error) {
    console.log('Audio não disponível');
  }
}

// Função principal - tenta usar MP3, se não encontrar usa o som gerado
export function playBubblePopSound(): void {
  // Inicializa o áudio se ainda não foi inicializado
  const audio = initBubblePopAudio();
  
  if (audio) {
    try {
      // Reseta o áudio para o início e toca
      audio.currentTime = 0;
      audio.play().catch((error) => {
        // Se falhar ao tocar (ex: autoplay bloqueado), usa o som gerado
        console.log('Não foi possível tocar o MP3, usando som gerado');
        playBubblePopSoundGenerated();
      });
      return;
    } catch (error) {
      // Se houver erro, usa o som gerado
      playBubblePopSoundGenerated();
      return;
    }
  }
  
  // Se não houver arquivo MP3, usa o som gerado
  playBubblePopSoundGenerated();
}

// Som de encerramento - mais suave e celebratório
export function playEndSound(): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Criar uma sequência de notas ascendentes (do, ré, mi)
    const frequencies = [523.25, 587.33, 659.25]; // C, D, E
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const startTime = now + index * 0.15;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
    
  } catch (error) {
    console.log('Audio não disponível');
  }
}

