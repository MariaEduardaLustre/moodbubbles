import React, { useEffect, useRef } from 'react';
import { WaterPuddle as WaterPuddleType } from '../types';

interface WaterPuddleProps {
  puddle: WaterPuddleType;
  onRemove: (id: number) => void;
}

export const WaterPuddle: React.FC<WaterPuddleProps> = ({ puddle, onRemove }) => {
  const puddleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!puddleRef.current) return;

    const element = puddleRef.current;
    
    // Animação da poça aparecendo e criando ondas
    const appearAnimation = element.animate(
      [
        {
          transform: 'scale(0)',
          opacity: 0,
        },
        {
          transform: 'scale(1.2)',
          opacity: 0.8,
        },
        {
          transform: 'scale(1)',
          opacity: 0.6,
        },
      ],
      {
        duration: 300,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fill: 'forwards',
      }
    );

    // Remover após 1 segundo
    const timer = setTimeout(() => {
      const fadeOut = element.animate(
        [
          { opacity: 0.6 },
          { opacity: 0 },
        ],
        {
          duration: 500,
          easing: 'ease-out',
          fill: 'forwards',
        }
      );

      fadeOut.onfinish = () => {
        onRemove(puddle.id);
      };
    }, 1000);

    return () => {
      appearAnimation.cancel();
      clearTimeout(timer);
    };
  }, [puddle, onRemove]);

  return (
    <div
      ref={puddleRef}
      style={{
        position: 'absolute',
        left: `${puddle.x - puddle.size / 2}px`,
        top: `${puddle.y - puddle.size / 2}px`,
        width: `${puddle.size}px`,
        height: `${puddle.size * 0.6}px`, // Poça é mais larga que alta
        borderRadius: '50%',
        background: `radial-gradient(ellipse at center, 
          ${puddle.color}80 0%,
          ${puddle.color}60 40%,
          ${puddle.color}40 70%,
          ${puddle.color}20 100%)`,
        pointerEvents: 'none',
        boxShadow: `
          inset 0 0 ${puddle.size * 0.2}px ${puddle.color}40,
          0 0 ${puddle.size * 0.3}px ${puddle.color}30
        `,
        filter: 'blur(2px)',
        transformOrigin: 'center center',
      }}
    >
      {/* Ondas na poça */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `2px solid ${puddle.color}60`,
          animation: 'ripple 1s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          borderRadius: '50%',
          border: `1px solid ${puddle.color}40`,
          animation: 'ripple 1s ease-out 0.2s',
        }}
      />
      {/* Brilho na poça */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: '40%',
          height: '30%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

