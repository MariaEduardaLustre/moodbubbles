import React from 'react';
import { InstallInstructions } from './InstallInstructions';

interface EndScreenProps {
  bubbleCount: number;
  onContinue: () => void;
  onBackToHome: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  bubbleCount,
  onContinue,
  onBackToHome,
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
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
        
        <h1
          style={{
            fontSize: '32px',
            color: '#333',
            marginBottom: '20px',
          }}
        >
          Tempo Esgotado!
        </h1>

        <div
          style={{
            background: 'linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '30px',
          }}
        >
          <div style={{ fontSize: '16px', color: '#fff', marginBottom: '8px' }}>
            Bolhas Estouradas
          </div>
          <div style={{ fontSize: '48px', fontWeight: '700', color: '#fff' }}>
            {bubbleCount}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button
            onClick={onContinue}
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
            ⏱️ Continuar mais 40 segundos
          </button>

          <button
            onClick={onBackToHome}
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
            🏠 Voltar à tela inicial
          </button>
        </div>
      </div>
      
      <InstallInstructions />
    </div>
  );
};

