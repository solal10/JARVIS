"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroServices() {
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
      
      {/* No decorative elements */}
      
      {/* Content */}
      <motion.div 
        className="container mx-auto text-center max-w-4xl z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Nos services
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Développement logiciel · Installation matériel · Support global
        </motion.p>
      </motion.div>
    </section>
  );
}
