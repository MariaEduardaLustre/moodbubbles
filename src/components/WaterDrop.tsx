import React, { useEffect, useRef } from 'react';
import { WaterDrop as WaterDropType } from '../types';

interface WaterDropProps {
  drop: WaterDropType;
  onRemove: (id: number) => void;
}

export const WaterDrop: React.FC<WaterDropProps> = ({ drop, onRemove }) => {
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropRef.current) return;

    const element = dropRef.current;
    
  
    
    // Animação da gota espirrando (trajetória arqueada como se estivesse voando)
    
    
    const animation = element.animate(
      [
        {
          transform: `translate(0, 0) scale(1) rotate(0deg)`,
          opacity: drop.opacity,
        },
        {
          transform: `translate(${drop.velocityX * 60}px, ${drop.velocityY * 60 - 20}px) scale(0.8) rotate(${Math.random() * 360}deg)`,
          opacity: drop.opacity * 0.8,
        },
        {
          transform: `translate(${drop.velocityX * 120}px, ${drop.velocityY * 120 + 30}px) scale(0.4) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Curva de trajetória arqueada
        fill: 'forwards',
      }
    );

    animation.onfinish = () => {
      onRemove(drop.id);
    };

    return () => {
      animation.cancel();
    };
  }, [drop, onRemove]);

  return (
    <div
      ref={dropRef}
      style={{
        position: 'absolute',
        left: `${drop.x}px`,
        top: `${drop.y}px`,
        width: `${drop.size}px`,
        height: `${drop.size}px`,
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', // Forma de gota
        background: `radial-gradient(circle at 30% 30%, 
          rgba(255, 255, 255, 0.9) 0%,
          ${drop.color}80 50%,
          ${drop.color} 100%)`,
        opacity: drop.opacity,
        pointerEvents: 'none',
        boxShadow: `
          0 0 ${drop.size * 0.3}px ${drop.color}60,
          inset -${drop.size * 0.1}px -${drop.size * 0.1}px ${drop.size * 0.2}px rgba(0, 0, 0, 0.1),
          inset ${drop.size * 0.15}px ${drop.size * 0.15}px ${drop.size * 0.3}px rgba(255, 255, 255, 0.7)
        `,
        filter: 'blur(0.3px)',
        border: `1px solid rgba(255, 255, 255, 0.5)`,
      }}
    >
      {/* Brilho na gota */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: `${drop.size * 0.4}px`,
          height: `${drop.size * 0.4}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

