import React from 'react';
import { Mood, GameMode } from '../types';
import { MOODS } from '../config/moods';

interface ControlsProps {
  currentMood: Mood;
  currentMode: GameMode;
  onMoodChange: (mood: Mood) => void;
  onModeChange: (mode: GameMode) => void;
  bubbleCount: number;
}

export const Controls: React.FC<ControlsProps> = ({
  currentMood,
  currentMode,
  onMoodChange,
  onModeChange,
  bubbleCount,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '15px',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '0 auto',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div>
        <h2 style={{ marginBottom: '10px', fontSize: '18px', color: '#333' }}>
          💭 Mood Bubbles
        </h2>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
          Estoure bolhas e relaxe
        </p>
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          Humor:
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(Object.keys(MOODS) as Mood[]).map((mood) => (
            <button
              key={mood}
              onClick={() => onMoodChange(mood)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: currentMood === mood ? '2px solid #333' : '2px solid #ddd',
                background: currentMood === mood ? MOODS[mood].colors[0] : '#fff',
                color: currentMood === mood ? '#fff' : '#333',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: currentMood === mood ? '600' : '400',
                transition: 'all 0.2s',
              }}
            >
              {MOODS[mood].name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          Modo:
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onModeChange('normal')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: currentMode === 'normal' ? '2px solid #333' : '2px solid #ddd',
              background: currentMode === 'normal' ? '#4A90E2' : '#fff',
              color: currentMode === 'normal' ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: currentMode === 'normal' ? '600' : '400',
            }}
          >
            Normal
          </button>
          <button
            onClick={() => onModeChange('storm')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: currentMode === 'storm' ? '2px solid #333' : '2px solid #ddd',
              background: currentMode === 'storm' ? '#FF6B6B' : '#fff',
              color: currentMode === 'storm' ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: currentMode === 'storm' ? '600' : '400',
            }}
          >
            ⛈️ Tempestade
          </button>
          <button
            onClick={() => onModeChange('zen')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: currentMode === 'zen' ? '2px solid #333' : '2px solid #ddd',
              background: currentMode === 'zen' ? '#51CF66' : '#fff',
              color: currentMode === 'zen' ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: currentMode === 'zen' ? '600' : '400',
            }}
          >
            🧘 Zen
          </button>
        </div>
      </div>

      <div
        style={{
          fontSize: '12px',
          color: '#666',
          paddingTop: '10px',
          borderTop: '1px solid #eee',
        }}
      >
        Bolhas estouradas: <strong>{bubbleCount}</strong>
      </div>
    </div>
  );
};

