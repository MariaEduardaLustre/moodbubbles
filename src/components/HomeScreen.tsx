import React from 'react';
import { Mood, GameMode } from '../types';
import { MOODS } from '../config/moods';
import { InstallInstructions } from './InstallInstructions';

interface HomeScreenProps {
  currentMood: Mood;
  currentMode: GameMode;
  onMoodChange: (mood: Mood) => void;
  onModeChange: (mode: GameMode) => void;
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentMood,
  currentMode,
  onMoodChange,
  onModeChange,
  onStart,
}) => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            color: '#333',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          💭 Mood Bubbles
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          Estoure bolhas e relaxe por 40 segundos
        </p>

        <div style={{ marginBottom: '30px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '12px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
            }}
          >
            Escolha seu humor:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {(Object.keys(MOODS) as Mood[]).map((mood) => (
              <button
                key={mood}
                onClick={() => onMoodChange(mood)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '25px',
                  border: currentMood === mood ? '3px solid #333' : '2px solid #ddd',
                  background: currentMood === mood ? MOODS[mood].colors[0] : '#fff',
                  color: currentMood === mood ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: currentMood === mood ? '600' : '400',
                  transition: 'all 0.2s',
                  flex: '1',
                  minWidth: '100px',
                }}
              >
                {MOODS[mood].name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '12px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
            }}
          >
            Escolha o modo:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button
              onClick={() => onModeChange('normal')}
              style={{
                padding: '15px 20px',
                borderRadius: '15px',
                border: currentMode === 'normal' ? '3px solid #333' : '2px solid #ddd',
                background: currentMode === 'normal' ? '#4A90E2' : '#fff',
                color: currentMode === 'normal' ? '#fff' : '#333',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: currentMode === 'normal' ? '600' : '400',
                transition: 'all 0.2s',
              }}
            >
              Normal
            </button>
            <button
              onClick={() => onModeChange('storm')}
              style={{
                padding: '15px 20px',
                borderRadius: '15px',
                border: currentMode === 'storm' ? '3px solid #333' : '2px solid #ddd',
                background: currentMode === 'storm' ? '#FF6B6B' : '#fff',
                color: currentMode === 'storm' ? '#fff' : '#333',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: currentMode === 'storm' ? '600' : '400',
                transition: 'all 0.2s',
              }}
            >
              ⛈️ Tempestade
            </button>
            <button
              onClick={() => onModeChange('zen')}
              style={{
                padding: '15px 20px',
                borderRadius: '15px',
                border: currentMode === 'zen' ? '3px solid #333' : '2px solid #ddd',
                background: currentMode === 'zen' ? '#51CF66' : '#fff',
                color: currentMode === 'zen' ? '#fff' : '#333',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: currentMode === 'zen' ? '600' : '400',
                transition: 'all 0.2s',
              }}
            >
              🧘 Zen
            </button>
          </div>
        </div>

        <button
          onClick={onStart}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '15px',
            border: 'none',
            background: 'linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)',
            color: 'white',
            fontSize: '20px',
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
          ▶️ Iniciar
        </button>
      </div>
      
      <InstallInstructions />
    </div>
  );
};

