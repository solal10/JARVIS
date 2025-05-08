"use client";

import React, { useEffect, useRef } from 'react';

interface PixelWaveProps {
  colors?: string[];
  pixelSize?: number;
  speed?: number;
  fade?: number;
  mouseTracking?: boolean;
}

export default function PixelWave({
  colors = ['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32'], // jarvisGold, monacoBlue, red, green
  pixelSize = 4,
  speed = 1.4,
  fade = 0.08,
  mouseTracking = true
}: PixelWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: -100, y: -100 });
  const prevMousePosition = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Array<{ x: number; y: number; color: string; life: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Clear canvas on resize
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseTracking) {
        prevMousePosition.current = { ...mousePosition.current };
        mousePosition.current = {
          x: e.clientX,
          y: e.clientY
        };
        
        // Add particles along the mouse path
        if (prevMousePosition.current.x !== -100) {
          const dx = mousePosition.current.x - prevMousePosition.current.x;
          const dy = mousePosition.current.y - prevMousePosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Add more particles for faster movements
          const steps = Math.max(1, Math.floor(distance / 5));
          
          for (let i = 0; i < steps; i++) {
            const ratio = i / steps;
            const x = prevMousePosition.current.x + dx * ratio;
            const y = prevMousePosition.current.y + dy * ratio;
            
            // Add multiple particles at each point
            for (let j = 0; j < 3; j++) {
              particles.current.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1.0 // Full life
              });
            }
          }
        }
      }
    };

    const draw = () => {
      if (!canvas || !ctx) return;
      
      // Apply fade effect instead of clearing
      ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        // Reduce life of particle
        particle.life -= 0.01 * speed;
        
        if (particle.life <= 0) return false;
        
        // Draw particle with fading opacity
        const color = particle.color;
        const opacity = particle.life.toFixed(2);
        ctx.fillStyle = color.replace(')', `, ${opacity})`);
        if (!color.startsWith('rgba')) {
          ctx.fillStyle = color.startsWith('rgb') 
            ? color.replace('rgb', 'rgba').replace(')', `, ${opacity})`) 
            : `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
        }
        
        ctx.fillRect(
          Math.floor(particle.x / pixelSize) * pixelSize,
          Math.floor(particle.y / pixelSize) * pixelSize,
          pixelSize,
          pixelSize
        );
        
        return true;
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Initial black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [colors, pixelSize, speed, fade, mouseTracking]);

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-20 bg-gradient-to-br from-[#001428] to-[#002a4f] blur-[100px]"></div>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        style={{ pointerEvents: 'none' }}
      />
    </>
  );
}
