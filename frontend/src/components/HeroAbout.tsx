"use client";

import React, { useEffect, useRef } from 'react';

export default function HeroAbout() {
  // Reference for the background canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation for subtle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6; // 60vh
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Subtle grid pattern animation
    let animationFrameId: number;
    const gridSize = 30;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid
      ctx.strokeStyle = 'rgba(201, 161, 61, 0.1)'; // jarvisGold with low opacity
      ctx.lineWidth = 0.5;
      
      const offset = (Date.now() / 5000) % 1; // Slow movement
      
      // Vertical lines
      for (let x = -offset * gridSize; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = -offset * gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="flex items-center justify-center min-h-[60vh] w-full bg-transparent text-white py-20 px-6 relative overflow-hidden">
      {/* Animated background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-40"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Content */}
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          À-propos de la SARL JARVIS
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          Notre histoire, notre équipe, notre vision
        </p>
      </div>
    </section>
  );
}
