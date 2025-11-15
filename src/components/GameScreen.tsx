import React, { useState, useEffect, useCallback } from 'react';
import { Bubble } from './Bubble';
import { WaterDrop } from './WaterDrop';
import { WaterPuddle } from './WaterPuddle';
import { InstallInstructions } from './InstallInstructions';
import { Mood, GameMode, Bubble as BubbleType, WaterDrop as WaterDropType, WaterPuddle as WaterPuddleType } from '../types';
import { MOODS } from '../config/moods';
import { playBubblePopSound, playEndSound } from '../utils/sound';
import { vibrate } from '../utils/vibration';

interface GameScreenProps {
  mood: Mood;
  mode: GameMode;
  onTimeUp: (bubbleCount: number) => void;
  onRestart?: () => void;
  onBackToHome?: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ 
  mood, 
  mode, 
  onTimeUp, 
  onRestart, 
  onBackToHome 
}) => {
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);
  const [waterDrops, setWaterDrops] = useState<WaterDropType[]>([]);
  const [waterPuddles, setWaterPuddles] = useState<WaterPuddleType[]>([]);
  const [bubbleCount, setBubbleCount] = useState(0);
  const [nextId, setNextId] = useState(0);
  const [dropId, setDropId] = useState(0);
  const [puddleId, setPuddleId] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [isRunning, setIsRunning] = useState(true);
  const [showEndMessage, setShowEndMessage] = useState(false);

  // Reset quando o componente monta (para quando continuar)
  useEffect(() => {
    setBubbles([]);
    setWaterDrops([]);
    setWaterPuddles([]);
    setBubbleCount(0);
    setTimeLeft(40);
    setIsRunning(true);
  }, []); // Reset apenas quando o componente monta

  const getSpeed = useCallback(() => {
    switch (mode) {
      case 'zen':
        return 0.5;
      case 'storm':
        return 3.0;
      default:
        return 1.5;
    }
  }, [mode]);

  const getSpawnRate = useCallback(() => {
    switch (mode) {
      case 'zen':
        return 2000;
      case 'storm':
        return 200;
      default:
        return 800;
    }
  }, [mode]);

  const createBubble = useCallback((): BubbleType => {
    const colors = MOODS[mood].colors;
    // Bolhas maiores: mínimo 40px, máximo 80px
    const size = mode === 'zen' 
      ? 50 + Math.random() * 40 // Bolhas ainda maiores no modo zen
      : 40 + Math.random() * 40;
    
    return {
      id: nextId,
      x: Math.random() * (window.innerWidth - size),
      y: window.innerHeight + size,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: getSpeed(),
      opacity: 0.6 + Math.random() * 0.4,
    };
  }, [mood, mode, nextId, getSpeed]);

  const handlePopBubble = useCallback((id: number, x: number, y: number) => {
    playBubblePopSound();
    vibrate();
    
    // Encontrar a bolha para pegar a cor e tamanho ANTES de remover
    setBubbles((prev) => {
      const poppedBubble = prev.find(b => b.id === id);
      const bubbleColor = poppedBubble?.color || '#87CEEB';
      const bubbleSize = poppedBubble?.size || 40;
      
      // Criar poça de água no lugar da bolha
      const puddleSize = bubbleSize * 0.8; // Poça um pouco menor que a bolha
      setWaterPuddles((prevPuddles) => [
        ...prevPuddles,
        {
          id: puddleId,
          x: x,
          y: y,
          size: puddleSize,
          color: bubbleColor,
        },
      ]);
      setPuddleId((prevId) => prevId + 1);
      
      // Criar gotas de água espirrando para fora da poça
      const numDrops = 12 + Math.floor(Math.random() * 8); // 12-19 gotas (mais gotas)
      const newDrops: WaterDropType[] = [];
      
      for (let i = 0; i < numDrops; i++) {
        // Ângulo mais espalhado para parecer que está espirrando
        const angle = (Math.PI * 2 * i) / numDrops + (Math.random() - 0.5) * 0.8;
        // Velocidade maior para parecer que está voando/espirrando
        const speed = 2.5 + Math.random() * 2.5; // 2.5-5.0 (mais rápido)
        const dropSize = 3 + Math.random() * 7; // 3-10px
        
        newDrops.push({
          id: dropId + i,
          x: x + (Math.cos(angle) * puddleSize * 0.3), // Começar na borda da poça
          y: y + (Math.sin(angle) * puddleSize * 0.3),
          size: dropSize,
          color: bubbleColor,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed - 0.3, // Mais para cima (espirrando)
          opacity: 0.8 + Math.random() * 0.2,
        });
      }
      
      setWaterDrops((prevDrops) => [...prevDrops, ...newDrops]);
      setDropId((prevId) => prevId + numDrops);
      
      // Remover a bolha
      return prev.filter((b) => b.id !== id);
    });
    
    setBubbleCount((prev) => prev + 1);
  }, [dropId, puddleId]);
  
  const handleRemoveDrop = useCallback((id: number) => {
    setWaterDrops((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const handleRemovePuddle = useCallback((id: number) => {
    setWaterPuddles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Timer de 40 segundos
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Quando o tempo acabar
  useEffect(() => {
    if (timeLeft === 0 && !isRunning && !showEndMessage) {
      setShowEndMessage(true);
      playEndSound();
      vibrate(200); // Vibração mais longa no fim (200ms)
    }
  }, [timeLeft, isRunning, showEndMessage]);

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      // Fallback: resetar o jogo
      setBubbles([]);
      setBubbleCount(0);
      setTimeLeft(40);
      setIsRunning(true);
      setShowEndMessage(false);
    }
  };

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      // Fallback: ir para tela de fim
      onTimeUp(bubbleCount);
    }
  };

  // Criar novas bolhas
  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const interval = setInterval(() => {
      if (isRunning && timeLeft > 0) {
        setBubbles((prev) => [...prev, createBubble()]);
        setNextId((prev) => prev + 1);
      }
    }, getSpawnRate());

    return () => clearInterval(interval);
  }, [createBubble, getSpawnRate, isRunning, timeLeft]);

  // Remover bolhas que saíram da tela
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles((prev) => prev.filter((b) => b.y > -100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const speed = getSpeed();

  const backgroundGradient = mode === 'zen' 
    ? 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%)'
    : mode === 'storm'
    ? 'linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 100%)'
    : 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 100%)';

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: backgroundGradient,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Timer e contador */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '15px 30px',
          borderRadius: '50px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Tempo
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: timeLeft <= 10 ? '#FF6B6B' : '#333',
            }}
          >
            {timeLeft}s
          </div>
        </div>
        <div
          style={{
            width: '2px',
            height: '40px',
            background: '#ddd',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            Estouradas
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#333' }}>
            {bubbleCount}
          </div>
        </div>
      </div>

      {/* Bolhas */}
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          bubble={bubble}
          onPop={handlePopBubble}
          speed={speed}
        />
      ))}

      {/* Poças de água */}
      {waterPuddles.map((puddle) => (
        <WaterPuddle
          key={puddle.id}
          puddle={puddle}
          onRemove={handleRemovePuddle}
        />
      ))}

      {/* Gotas de água espirrando */}
      {waterDrops.map((drop) => (
        <WaterDrop
          key={drop.id}
          drop={drop}
          onRemove={handleRemoveDrop}
        />
      ))}

      {/* Instrução */}
      {!showEndMessage && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#666',
            fontSize: '14px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '10px 20px',
            borderRadius: '20px',
          }}
        >
          💡 Toque nas bolhas para estourá-las
        </div>
      )}

      {/* Mensagem de encerramento */}
      {showEndMessage && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2000,
            background: 'rgba(255, 255, 255, 0.98)',
            padding: '40px 60px',
            borderRadius: '30px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            animation: 'fadeInScale 0.5s ease-out',
            maxWidth: '90%',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
          <h2
            style={{
              fontSize: '36px',
              color: '#333',
              marginBottom: '10px',
              fontWeight: '700',
            }}
          >
            Tempo Esgotado!
          </h2>
          <p
            style={{
              fontSize: '24px',
              color: '#666',
              marginTop: '10px',
              marginBottom: '30px',
            }}
          >
            Você estourou <strong style={{ color: '#87CEEB' }}>{bubbleCount}</strong> bolhas!
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
            <button
              onClick={handleRestart}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '15px',
                border: 'none',
                background: 'linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(135, 206, 235, 0.4)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(135, 206, 235, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(135, 206, 235, 0.4)';
              }}
            >
              🔄 Recomeçar
            </button>

            <button
              onClick={handleBackToHome}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '15px',
                border: '2px solid #87CEEB',
                background: 'white',
                color: '#87CEEB',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              🏠 Voltar ao Início
            </button>
          </div>
        </div>
      )}

      <InstallInstructions />
    </div>
  );
};

