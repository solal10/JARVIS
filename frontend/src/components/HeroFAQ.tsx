"use client";

import React, { useState } from 'react';
import BaseHero from './BaseHero';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function HeroFAQ() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples(prev => [...prev, { x, y, id: Date.now() }]);
  };

  const removeRipple = (id: number) => {
    setRipples(prev => prev.filter(ripple => ripple.id !== id));
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.8s linear;
          background-color: rgba(201, 161, 61, 0.3);
          width: 100px;
          height: 100px;
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>

      {/* Ripple effect */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
          }}
          onAnimationEnd={() => removeRipple(ripple.id)}
        />
      ))}

      <BaseHero
        title="Questions Fréquentes JARVIS"
        subtitle="Développement logiciel, audit IA & solutions entreprises France"
      />
    </div>
  );
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}
