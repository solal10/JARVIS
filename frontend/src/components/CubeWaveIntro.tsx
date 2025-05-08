"use client";

import React, { useEffect, useRef } from 'react';

interface CubeWaveIntroProps {
  duration?: number; // in seconds
  onComplete?: () => void; // Callback when animation completes
  colors?: string[];
  cubeSize?: number;
  borderWidth?: number;
}

export default function CubeWaveIntro({
  duration = 12, // Dramatically increased duration for extremely slow animation
  onComplete,
  colors = ['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32'], // jarvisGold, monacoBlue, red, green
  cubeSize = 40,
  borderWidth = 2
}: CubeWaveIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationDuration = duration * 1000; // convert to milliseconds
  const colorMapRef = useRef<Map<string, string>>(new Map());
  const hasCompletedRef = useRef<boolean>(false);
  const hasCalledOnCompleteRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize
    handleResize();
    startTimeRef.current = performance.now();
    hasCompletedRef.current = false;
    hasCalledOnCompleteRef.current = false;

    // Pre-assign random colors to each position
    const actualColumns = Math.ceil(canvas.width / cubeSize);
    const actualRows = Math.ceil(canvas.height / cubeSize);
    
    for (let row = 0; row < actualRows; row++) {
      for (let col = 0; col < actualColumns; col++) {
        const key = `${col}-${row}`;
        if (!colorMapRef.current.has(key)) {
          // Randomly select a color from the colors array
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          colorMapRef.current.set(key, randomColor);
        }
      }
    }

    // Animation function
    const animate = (timestamp: number) => {
      if (!canvas) return;
      
      // Get rendering context
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fill with black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate progress (0 to 1)
      const elapsed = timestamp - startTimeRef.current;
      const normalizedProgress = Math.min(1, elapsed / animationDuration);
      
      // Calculate actual columns and rows
      const actualColumns = Math.ceil(canvas.width / cubeSize);
      const actualRows = Math.ceil(canvas.height / cubeSize);
      
      // Base width of the colored wave band (significantly reduced)
      const baseWaveBandWidth = 0.05;
      
      // Track if we've reached the top right corner
      let hasReachedTopRight = false;
      
      // Calculate the center point of the diagonal line
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw cubes
      for (let col = 0; col < actualColumns; col++) {
        for (let row = 0; row < actualRows; row++) {
          // Calculate position in diagonal wave
          const bottomLeftX = 0;
          const bottomLeftY = canvas.height;
          // These variables are used for reference but not directly in calculations
          // const topRightX = canvas.width;
          // const topRightY = 0;
          const cubeX = col * cubeSize + cubeSize / 2;
          const cubeY = row * cubeSize + cubeSize / 2;
          
          // Check if this is the top-right corner cube
          const isTopRightCorner = col === actualColumns - 1 && row === 0;
          
          // Calculate distance from bottom left (normalized 0-1)
          const dx = cubeX - bottomLeftX;
          const dy = bottomLeftY - cubeY; // Inverted because y increases downward
          
          // Combine x and y position for diagonal wave
          const diagonalPosition = (dx / canvas.width) * 0.5 + (dy / canvas.height) * 0.5;
          const offset = diagonalPosition * 0.4; // Reduced offset for faster wave
          
          // Calculate cube progress
          const cubeProgress = normalizedProgress - offset;
          
          // Calculate distance from center of diagonal line
          const distanceFromCenterX = Math.abs(cubeX - centerX);
          const distanceFromCenterY = Math.abs(cubeY - centerY);
          const normalizedDistanceFromCenter = Math.sqrt(
            Math.pow(distanceFromCenterX / (canvas.width / 2), 2) + 
            Math.pow(distanceFromCenterY / (canvas.height / 2), 2)
          ) / Math.sqrt(2); // Normalize to 0-1 range
          
          // Calculate variable wave band width - wider in the middle, narrower at edges
          const variableWaveBandWidth = baseWaveBandWidth * (1 + 0.5 * (1 - normalizedDistanceFromCenter));
          
          // Determine if this cube is in the active wave band
          const isInWaveBand = cubeProgress >= 0 && cubeProgress <= variableWaveBandWidth;
          const isPlaced = cubeProgress > variableWaveBandWidth;
          
          // If the top-right corner cube is in the wave band, we've reached the end
          if (isTopRightCorner && (isInWaveBand || isPlaced)) {
            hasReachedTopRight = true;
          }
          
          // Calculate cube position
          const x = col * cubeSize;
          const y = row * cubeSize;
          
          // Get the position key and color
          const posKey = `${col}-${row}`;
          const borderColor = colorMapRef.current.get(posKey) || colors[0];
          
          // Draw the cube based on its state
          if (isInWaveBand) {
            // This cube is in the active wave band - draw with colored glow
            drawCubeWithGlow(ctx, x, y, cubeSize, borderColor, borderWidth);
          } else if (isPlaced) {
            // This cube has been placed - draw as black with black border
            drawPlacedCube(ctx, x, y, cubeSize, borderWidth);
          }
        }
      }
      
      // If we've reached the top right and haven't called onComplete yet
      if (hasReachedTopRight && !hasCalledOnCompleteRef.current && onComplete) {
        hasCalledOnCompleteRef.current = true;
        // Call onComplete immediately
        onComplete();
        
        // Stop the animation after a short delay to ensure the wave is visible
        setTimeout(() => {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
        }, 100);
      }
      
      // Continue animation if not stopped
      if (animationFrameId.current !== null) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };
    
    // Helper function to draw a cube in the wave band with glow
    const drawCubeWithGlow = (
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number, 
      borderColor: string,
      borderWidth: number
    ) => {
      // Draw with Tron-like glow effect
      ctx.fillStyle = '#000000';
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      
      // Draw cube shape
      ctx.beginPath();
      const inset = size * 0.15;
      ctx.moveTo(x, y);
      ctx.lineTo(x + size - inset, y);
      ctx.lineTo(x + size, y + inset);
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x, y + size);
      ctx.closePath();
      
      ctx.fill();
      
      // Add glow effect
      ctx.shadowColor = borderColor;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    };
    
    // Helper function to draw a placed (black) cube
    const drawPlacedCube = (
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number, 
      borderWidth: number
    ) => {
      ctx.fillStyle = '#000000';
      ctx.strokeStyle = '#000000'; // Pure black border
      ctx.lineWidth = borderWidth;
      
      // Draw cube shape
      ctx.beginPath();
      const inset = size * 0.15;
      ctx.moveTo(x, y);
      ctx.lineTo(x + size - inset, y);
      ctx.lineTo(x + size, y + inset);
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x, y + size);
      ctx.closePath();
      
      ctx.fill();
      ctx.stroke();
    };

    // Start animation
    window.addEventListener('resize', handleResize);
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [cubeSize, duration, colors, borderWidth, onComplete, animationDuration]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
