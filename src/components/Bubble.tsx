import React, { useEffect, useRef, useState } from 'react';
import { Bubble as BubbleType } from '../types';

interface BubbleProps {
  bubble: BubbleType;
  onPop: (id: number, x: number, y: number) => void;
  speed: number;
}

export const Bubble: React.FC<BubbleProps> = ({ bubble, onPop, speed }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    if (!bubbleRef.current || isPopping) return;

    const element = bubbleRef.current;
    const startY = bubble.y;
    const endY = -100;
    const distance = Math.abs(startY - endY);
    const duration = (distance / speed) * 16; // Ajuste para velocidade (ms)

    const animation = element.animate(
      [
        { transform: 'translateY(0px)', opacity: bubble.opacity },
        { transform: `translateY(${endY - startY}px)`, opacity: 0 },
      ],
      {
        duration: Math.max(duration, 1000), // Mínimo de 1 segundo
        easing: 'linear',
        fill: 'forwards',
      }
    );

    return () => {
      animation.cancel();
    };
  }, [bubble.y, bubble.opacity, speed, isPopping]);

  const handleClick = () => {
    if (isPopping) return;
    
    setIsPopping(true);
    
    // Animação de estouro mais "molhada" - expande e se desfaz
    if (bubbleRef.current) {
      const element = bubbleRef.current;
      
      // Criar partículas de "água" ao estourar
      const popAnimation = element.animate(
        [
          { 
            transform: 'scale(1)', 
            opacity: bubble.opacity,
            filter: 'blur(0.5px)',
          },
          { 
            transform: 'scale(1.8)', 
            opacity: 0.3,
            filter: 'blur(3px)',
          },
          { 
            transform: 'scale(2.2)', 
            opacity: 0,
            filter: 'blur(5px)',
          },
        ],
        {
          duration: 200,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        }
      );

      popAnimation.onfinish = () => {
        // Calcular posição central da bolha
        const centerX = bubble.x + bubble.size / 2;
        const centerY = bubble.y + bubble.size / 2;
        onPop(bubble.id, centerX, centerY);
      };
    } else {
      const centerX = bubble.x + bubble.size / 2;
      const centerY = bubble.y + bubble.size / 2;
      onPop(bubble.id, centerX, centerY);
    }
  };

  // Criar gradiente radial para efeito de bolha de sabão
  const bubbleGradient = `radial-gradient(circle at 30% 30%, 
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.3) 15%,
    ${bubble.color}80 40%,
    ${bubble.color} 70%,
    ${bubble.color}CC 100%)`;

  return (
    <div
      ref={bubbleRef}
      onClick={handleClick}
      onTouchStart={handleClick}
      style={{
        position: 'absolute',
        left: `${bubble.x}px`,
        top: `${bubble.y}px`,
        width: `${bubble.size}px`,
        height: `${bubble.size}px`,
        borderRadius: '50%',
        background: bubbleGradient,
        opacity: bubble.opacity,
        cursor: 'pointer',
        transition: 'transform 0.1s ease-out',
        boxShadow: `
          0 0 ${bubble.size * 0.3}px ${bubble.color}60,
          inset -${bubble.size * 0.15}px -${bubble.size * 0.15}px ${bubble.size * 0.3}px rgba(0, 0, 0, 0.2),
          inset ${bubble.size * 0.2}px ${bubble.size * 0.2}px ${bubble.size * 0.4}px rgba(255, 255, 255, 0.6),
          0 0 ${bubble.size * 0.5}px rgba(255, 255, 255, 0.3)
        `,
        pointerEvents: 'auto',
        touchAction: 'manipulation',
        border: `1px solid rgba(255, 255, 255, 0.4)`,
        filter: 'blur(0.5px)',
      }}
      onMouseEnter={(e) => {
        if (!isPopping) {
          e.currentTarget.style.transform = 'scale(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isPopping) {
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      {/* Reflexo de luz superior */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '25%',
          width: `${bubble.size * 0.3}px`,
          height: `${bubble.size * 0.3}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Reflexo secundário */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '60%',
          width: `${bubble.size * 0.15}px`,
          height: `${bubble.size * 0.15}px`,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Brilho iridescente */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          borderRadius: '50%',
          background: `conic-gradient(
            from 0deg,
            ${bubble.color}00 0deg,
            rgba(255, 255, 255, 0.3) 90deg,
            ${bubble.color}00 180deg,
            rgba(255, 255, 255, 0.2) 270deg,
            ${bubble.color}00 360deg
          )`,
          opacity: 0.4,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

