import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';
import { EndScreen } from './components/EndScreen';
import { Mood, GameMode } from './types';

type Screen = 'home' | 'game' | 'end';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [mood, setMood] = useState<Mood>('calm');
  const [mode, setMode] = useState<GameMode>('normal');
  const [lastBubbleCount, setLastBubbleCount] = useState(0);
  const [gameKey, setGameKey] = useState(0); // Key para resetar o GameScreen

  const handleStart = () => {
    setGameKey(prev => prev + 1); // Incrementa a key para resetar
    setScreen('game');
  };

  const handleTimeUp = (bubbleCount: number) => {
    setLastBubbleCount(bubbleCount);
    setScreen('end');
  };

  const handleContinue = () => {
    setGameKey(prev => prev + 1); // Incrementa a key para resetar
    setScreen('game');
  };

  const handleBackToHome = () => {
    setScreen('home');
  };

  const handleRestart = () => {
    setGameKey(prev => prev + 1); // Incrementa a key para resetar
    // Permanece na tela de jogo, mas reseta tudo
  };

  return (
    <>
      {screen === 'home' && (
        <HomeScreen
          currentMood={mood}
          currentMode={mode}
          onMoodChange={setMood}
          onModeChange={setMode}
          onStart={handleStart}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          key={gameKey} // Key para resetar o componente quando continuar
          mood={mood}
          mode={mode}
          onTimeUp={handleTimeUp}
          onRestart={handleRestart}
          onBackToHome={handleBackToHome}
        />
      )}

      {screen === 'end' && (
        <EndScreen
          bubbleCount={lastBubbleCount}
          onContinue={handleContinue}
          onBackToHome={handleBackToHome}
        />
      )}
    </>
  );
}

export default App;

