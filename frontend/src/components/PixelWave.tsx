"use client";

import React, { useEffect, useRef } from 'react';

interface PixelWaveProps {
  colors?: string[];
  pixelSize?: number;
  speed?: number;
  fade?: number;
  mouseTracking?: boolean;
  direction?: 'down' | 'up' | 'random';
  borderWidth?: number;
  minPixelSize?: number;
  maxPixelSize?: number;
  explosionRadius?: number;
  initialEnabled?: boolean;
}

export default function PixelWave({
  colors = ['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32'], // jarvisGold, monacoBlue, red, green
  pixelSize = 20, // base pixel size
  minPixelSize = 10, // minimum pixel size for randomization
  maxPixelSize = 30, // maximum pixel size for randomization
  speed = 1.1,
  fade = 0.15,
  mouseTracking = true,
  direction = 'down',
  borderWidth = 2,
  explosionRadius = 150, // radius around mouse click for explosion effect
  initialEnabled = true // whether the animation is initially enabled
}: PixelWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: -100, y: -100 });
  const prevMousePosition = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef<number | null>(null);
  const lastFrameTime = useRef(0);
  const frameThrottle = 33; // ~30fps for aggressive TBT optimization
  const [isEnabled, setIsEnabled] = React.useState(initialEnabled);
  const isInitialized = useRef(false);
  const particles = useRef<Array<{ 
    x: number; 
    y: number; 
    color: string; 
    life: number; 
    vx: number; 
    vy: number; 
    size: number; 
    rotation: number;
    zIndex: number;
    gravity?: number;
    initialVelocity?: boolean;
    burstPhase?: number;
  }>>([]);

  useEffect(() => {
    // Event listener for toggling effects
    const handleTogglePixelWave = (event: CustomEvent<{ enabled: boolean }>) => {
      setIsEnabled(event.detail.enabled);
    };

    window.addEventListener('togglePixelWave', handleTogglePixelWave as EventListener);

    return () => {
      window.removeEventListener('togglePixelWave', handleTogglePixelWave as EventListener);
    };
  }, []);


  useEffect(() => {
    // Prevent double initialization
    if (isInitialized.current) return;
    isInitialized.current = true;

    const canvas = canvasRef.current;
    if (!canvas) {
      isInitialized.current = false;
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      isInitialized.current = false;
      return;
    }
    
    // If animation is disabled, clear everything
    if (!isEnabled) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      particles.current = [];
      return;
    }

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
        
        // Add particles along the mouse path, but much more sparingly
        if (prevMousePosition.current.x !== -100) {
          const dx = mousePosition.current.x - prevMousePosition.current.x;
          const dy = mousePosition.current.y - prevMousePosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Respond to all movements, but with fewer particles
          if (distance > 0) { // No threshold - respond to all movements
            // Moderate chance de créer des particules basée sur la distance
            const createChance = Math.min(0.4, 0.2 + (distance / 200));

            if (Math.random() < createChance) {
              // Ultra minimal particles - just 1 for all movements
              const particleCount = 4; // Encore plus de particules
              
              // For very small movements, just create a single particle at current position
              if (distance < 5) {
                createExplosionEffect(e.clientX, e.clientY, particleCount);
              } else {
                // For larger movements, create very few particles along the path
                // Increase step size for fewer particles overall
                const steps = Math.max(1, Math.floor(distance / 20)); // Maximum de particules sur le trajet
                
                // Only place particles at some points along the path
                for (let i = 0; i < steps; i++) {
                  // Skip some steps
                  if (i % 2 === 0) { // Only use every other step point
                    const ratio = i / steps;
                    const x = prevMousePosition.current.x + dx * ratio;
                    const y = prevMousePosition.current.y + dy * ratio;
                    
                    createExplosionEffect(x, y, particleCount);
                  }
                }
              }
            }
          }
        }
      }
    };
    
    const handleMouseClick = (e: MouseEvent) => {
      if (mouseTracking) {
        // Create a dramatic breaking effect on click
        createBreakingEffect(e.clientX, e.clientY, 10);
      }
    };
    
    // Special effect for clicks that simulates breaking glass/wall
    const createBreakingEffect = (centerX: number, centerY: number, particleCount: number) => {
      // Create particles that explode outward in all directions
      for (let i = 0; i < particleCount; i++) {
        // Create particles in all directions for a breaking effect
        const angle = Math.random() * Math.PI * 2; // Random angle (full 360 degrees)
        
        // Initial explosion velocity - more natural range
        const initialSpeed = 1.0 + Math.random() * 2.0; // Moderate initial speed
        
        // Add some downward bias from the start for more natural arcs
        // This ensures particles start moving in an arc rather than straight lines
        const downwardBias = 0.3 + Math.random() * 0.3; // Subtle downward component
        
        const vx = Math.cos(angle) * initialSpeed;
        // Add downward bias to vertical velocity
        const vy = Math.sin(angle) * initialSpeed + downwardBias;
        
        // Randomize pixel size
        const size = minPixelSize + Math.random() * (maxPixelSize - minPixelSize);
        
        // Randomize z-index to create layering effect
        const zIndex = Math.floor(Math.random() * 10);
        
        // Random distance from center, closer to create a tighter initial burst
        const distance = Math.random() * (explosionRadius / 8);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Add gravity effect that will take over gradually
        const gravityEffect = 0.08 + Math.random() * 0.08; // Plus de gravité pour chute plus rapide
        
        particles.current.push({
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 2.0 + Math.random() * 1.0,
          vx, 
          vy,
          size,
          rotation: Math.random() * 60 - 30, // Moderate rotation
          zIndex,
          gravity: gravityEffect, // Add gravity property
          // No discrete burst phase - gravity will create natural arcs
        });
      }
    };
    
    const createExplosionEffect = (centerX: number, centerY: number, particleCount: number) => {
      // Drastically reduce particles for TBT optimization
      const actualParticleCount = Math.max(1, Math.floor(particleCount / 2)); // Moins de réduction

      // Very aggressive particle limit for TBT
      if (particles.current.length > 20) {
        // Remove oldest particles if we exceed the limit
        particles.current = particles.current.slice(-15);
      }
      
      for (let i = 0; i < actualParticleCount; i++) {
        // Create particles in a smaller radius around the mouse
        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = Math.random() * (explosionRadius / 6); // Tighter radius
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // More natural initial velocities with downward bias
        const initialSpeed = 0.3 + Math.random() * 0.4;
        const downwardBias = 0.2 + Math.random() * 0.3;
        
        const vx = Math.cos(angle) * initialSpeed * 0.5;
        const vy = Math.sin(angle) * initialSpeed + downwardBias;
        
        // Randomize pixel size
        const size = minPixelSize + Math.random() * (maxPixelSize - minPixelSize);
        
        // Randomize z-index to create layering effect
        const zIndex = Math.floor(Math.random() * 10);
        
        // Add gentle gravity for natural arcs
        const gravityEffect = 0.06 + Math.random() * 0.06; // Plus de gravité
        
        particles.current.push({
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 2.0 + Math.random() * 1.0, // Longer life for better visibility
          vx, 
          vy,
          size,
          rotation: Math.random() * 40 - 20,
          zIndex,
          gravity: gravityEffect // Add gravity for smooth arcs
        });
      }
    };
    
    // Function to generate random pixels for the falling effect
    const generateRandomPixels = () => {
      if (canvas) {
        // Generate minimal pixels at the top of the screen
        const pixelsToAdd = Math.floor(canvas.width / (pixelSize * 320)); // Reduced even more

        // Generate particles very consistently for more visible animation
        if (Math.random() < 0.1) {
          return; // Only 10% chance to skip, much more consistent generation
        }

        // Generate more particles for better animation continuity
        const actualPixelsToAdd = Math.min(pixelsToAdd, 2);
        
        for (let i = 0; i < actualPixelsToAdd; i++) {
          // Calculate velocity based on direction - add slight wobble
          const vx = (Math.random() - 0.5) * 0.8; // More horizontal movement for more visible effect
          const vy = 0.4 + Math.random() * 0.8; // Varied downward movement
          
          // Randomize pixel size
          const size = minPixelSize + Math.random() * (maxPixelSize - minPixelSize);
          
          // Randomize z-index to create layering effect
          const zIndex = Math.floor(Math.random() * 10);
          
          // Add gentle gravity for natural acceleration
          const gravityEffect = 0.04 + Math.random() * 0.04; // Plus de gravité
          
          // Mostly focus on downward direction
          particles.current.push({
            x: Math.random() * canvas.width,
            y: -size,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 2.0 + Math.random() * 1.0,
            vx,
            vy,
            size,
            rotation: Math.random() * 40 - 20,
            zIndex,
            gravity: gravityEffect // Add gravity for smooth acceleration
          });
        }
      }
    };

    const draw = (currentTime: number = 0) => {
      try {
        if (!canvas || !ctx) {
          // Always continue animation even if canvas not ready
          if (isEnabled) {
            animationFrameId.current = requestAnimationFrame(draw);
          }
          return;
        }

        // Apply throttling for better TBT performance
        if (currentTime - lastFrameTime.current < frameThrottle) {
          if (isEnabled) {
            animationFrameId.current = requestAnimationFrame(draw);
          }
          return;
        }
        lastFrameTime.current = currentTime;

        // Apply fade effect instead of clearing
        ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Generate particles with aggressive TBT optimization
        if (Math.floor(currentTime / 100) % 2 === 0) { // Generate every ~200ms for better TBT
          try {
            generateRandomPixels();
          } catch (err) {
            console.error('Error in generateRandomPixels:', err);
          }
        }
      
      // Skip sorting to prevent freezes - visual layering is not critical
      
      // SAFE particle update - time-sliced processing for TBT
      let activeParticles = [];
      const startTime = performance.now();
      const maxProcessingTime = 8; // Max 8ms per frame for TBT optimization

      for (let i = 0; i < particles.current.length; i++) {
        // Break if we've exceeded our time budget
        if (performance.now() - startTime > maxProcessingTime) {
          // Keep remaining particles for next frame
          activeParticles.push(...particles.current.slice(i));
          break;
        }
        const particle = particles.current[i];

        // Basic validation
        if (!particle || !particle.life || particle.life <= 0) {
          continue; // Skip invalid or dead particles
        }

        // Smoother updates for better fluidity
        particle.life -= 0.008; // Slower fade for longer visibility

        // Add back physics for smoother movement
        if (particle.gravity) {
          particle.vy += particle.gravity; // Apply gravity
        }
        particle.x += particle.vx || 0;
        particle.y += particle.vy || 1.5; // Smoother falling speed

        // Add more visible rotation animation
        if (particle.rotation !== undefined) {
          particle.rotation += 2; // More noticeable rotation
        }

        // Keep particles that are still alive and on screen
        if (particle.life > 0 && particle.y < canvas.height + 100) {
          // Restore original pixel aesthetics with stable rendering
          const size = particle.size || 20;
          const x = particle.x || 0;
          const y = particle.y || 0;
          const opacity = Math.max(0, Math.min(1, particle.life));

          // Skip expensive transformations for TBT optimization
          // Use simple rectangles for better performance
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.fillRect(x, y, size, size);

          // Batch stroke operations for better performance
          ctx.strokeStyle = particle.color || '#C9A13D';
          ctx.lineWidth = borderWidth || 2;
          ctx.strokeRect(x, y, size, size);

          activeParticles.push(particle);
        }
      }

      particles.current = activeParticles;

      // Always continue the animation loop - FORCE it to continue
      if (isEnabled) {
        animationFrameId.current = requestAnimationFrame(draw);
      } else {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }
      } catch (error) {
        console.error('PixelWave error:', error);
        // Continue animation even on error
        if (isEnabled) {
          animationFrameId.current = requestAnimationFrame(draw);
        }
      }
    };

    // Initial black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    // Add scroll listener to ensure animation continues
    const handleScroll = () => {
      // Ensure animation continues during scroll
      if (isEnabled && !animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(draw);
      }
    };

    // Add both scroll and resize listeners for better coverage
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      isInitialized.current = false;
    };
  }, [colors, pixelSize, speed, fade, mouseTracking, direction, borderWidth, minPixelSize, maxPixelSize, explosionRadius, isEnabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
