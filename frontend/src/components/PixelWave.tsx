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
  const frameThrottle = 40; // ~25fps for better TBT performance
  const [isEnabled, setIsEnabled] = React.useState(initialEnabled);
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
      console.log('PixelWave received event:', event.detail);
      setIsEnabled(event.detail.enabled);
    };

    window.addEventListener('togglePixelWave', handleTogglePixelWave as EventListener);

    return () => {
      window.removeEventListener('togglePixelWave', handleTogglePixelWave as EventListener);
    };
  }, []);

  // Log when isEnabled changes
  useEffect(() => {
    console.log('PixelWave isEnabled:', isEnabled);
  }, [isEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
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
              const particleCount = 1; // Fixed at 1 particle to reduce total count
              
              // For very small movements, just create a single particle at current position
              if (distance < 5) {
                createExplosionEffect(e.clientX, e.clientY, particleCount);
              } else {
                // For larger movements, create very few particles along the path
                // Increase step size for fewer particles overall
                const steps = Math.max(1, Math.floor(distance / 40));
                
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
        const gravityEffect = 0.05 + Math.random() * 0.05; // Gentler gravity for smoother arcs
        
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
      const actualParticleCount = Math.max(1, Math.floor(particleCount / 4));

      // Ultra-conservative particle limit for TBT optimization
      if (particles.current.length > 15) {
        // Remove oldest particles if we exceed the limit
        particles.current = particles.current.slice(-10);
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
        const gravityEffect = 0.03 + Math.random() * 0.03;
        
        particles.current.push({
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.5 + Math.random() * 0.5,
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

        // Only add pixels ultra rarely to reduce TBT
        if (Math.random() < 0.998) {
          return; // 99.8% chance to skip adding background pixels
        }

        // Limit to just 1 pixel at a time
        const actualPixelsToAdd = Math.min(pixelsToAdd, 1);
        
        for (let i = 0; i < actualPixelsToAdd; i++) {
          // Calculate velocity based on direction - add slight wobble
          const vx = (Math.random() - 0.5) * 0.3; // Slight horizontal movement for natural wobble
          const vy = 0.6 + Math.random() * 0.6; // Moderate downward movement
          
          // Randomize pixel size
          const size = minPixelSize + Math.random() * (maxPixelSize - minPixelSize);
          
          // Randomize z-index to create layering effect
          const zIndex = Math.floor(Math.random() * 10);
          
          // Add gentle gravity for natural acceleration
          const gravityEffect = 0.01 + Math.random() * 0.02;
          
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
      if (!canvas || !ctx) return;

      // Throttle to reduce CPU usage for TBT optimization
      if (currentTime - lastFrameTime.current < frameThrottle) {
        animationFrameId.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime.current = currentTime;
      
      // Apply fade effect instead of clearing
      ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Further particle reduction for final TBT optimization
      if (Math.random() < 0.01 * speed) { // Minimal generation for better TBT
        generateRandomPixels();
      }
      
      // Reduce sorting frequency dramatically to minimize blocking
      if (particles.current.length > 50 && Math.random() < 0.01) {
        particles.current.sort((a, b) => a.zIndex - b.zIndex);
      }
      
      // Optimized particle update - use for loop instead of filter for better performance
      let activeParticles = [];
      for (let i = 0; i < particles.current.length; i++) {
        const particle = particles.current[i];
        // Slightly faster particle death to reduce total count
        particle.life -= 0.008 * speed;
        
        // Apply gravity to all particles from click effect
        if (particle.gravity) {
          // Apply gravity continuously for a natural arc
          particle.vy += particle.gravity * speed;
          
          // Gradually reduce horizontal velocity for a natural curve
          particle.vx *= 0.99; // Very gradual reduction
          
          // Update position based on current velocity
          particle.x += particle.vx * speed;
          particle.y += particle.vy * speed;
          
          // Gradually increase rotation as particle falls
          particle.rotation += (particle.vx > 0 ? 0.2 : -0.2) * speed;
        } else {
          // Regular update for normal particles
          // Update position based on velocity
          particle.x += particle.vx * speed;
          particle.y += particle.vy * speed * 2.5; // Much faster vertical movement for falling effect
        }
        
        // Only remove particles that are far out of bounds or have no life left
        // This allows them to fall completely off screen
        if (particle.life <= 0 || 
            particle.x < -particle.size * 2 || 
            particle.x > canvas.width + particle.size * 2 || 
            particle.y > canvas.height + particle.size * 10) { // Allow them to fall far below the screen
          return false;
        }
        
        // Save the current context state
        ctx.save();
        
        // Move to the center of where the pixel will be drawn
        const centerX = particle.x;
        const centerY = particle.y;
        ctx.translate(centerX, centerY);
        
        // Apply rotation
        ctx.rotate(particle.rotation * Math.PI / 180);
        
        // Calculate the position to draw the pixel (centered at origin after translation)
        const halfSize = particle.size / 2;
        
        // Draw the black fill (inside of pixel)
        ctx.fillStyle = 'rgba(0, 0, 0, ' + particle.life.toFixed(2) + ')';
        ctx.fillRect(-halfSize, -halfSize, particle.size, particle.size);
        
        // Draw the colored border
        const color = particle.color;
        const opacity = particle.life.toFixed(2);
        ctx.strokeStyle = color.replace(')', `, ${opacity})`);
        if (!color.startsWith('rgba')) {
          ctx.strokeStyle = color.startsWith('rgb') 
            ? color.replace('rgb', 'rgba').replace(')', `, ${opacity})`) 
            : `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
        }
        
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(-halfSize, -halfSize, particle.size, particle.size);
        
        // Restore the context to its original state
        ctx.restore();
        
        activeParticles.push(particle);
      }
      particles.current = activeParticles;

      animationFrameId.current = requestAnimationFrame(draw);
    };

    // Initial black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
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
