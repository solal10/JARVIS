"use client";

import React, { useState, useEffect, useCallback } from 'react';
import CubeWaveIntro from './CubeWaveIntro';
import PixelWave from './PixelWave';
import Hero from './Hero';
import ServicesGrid from './ServicesGrid';
import TeamSection from './TeamSection';
import FAQTeaser from './FAQTeaser';
import JarvisModel from './JarvisModel';
import ProjectsShowcase from './ProjectsShowcase';

interface HomeSequenceProps {
  heroContent: {
    h1: string;
    p: string;
    buttonPrimary: {
      text: string;
      href: string;
      color?: string;
      style: 'solid' | 'outline';
    };
  };
  servicesItems: {
    title: string;
    description: string;
    icon: string;
    highlight?: boolean;
  }[];
  teamMembers: {
    name: string;
    role: string;
    image: string;
  }[];
  faqItems: {
    q: string;
    a: string;
  }[];
}

export default function HomeSequence({ 
  heroContent, 
  servicesItems, 
  teamMembers, 
  faqItems 
}: HomeSequenceProps) {
  // Initialize sequence state
  const [sequenceStep, setSequenceStep] = useState<'intro' | 'content'>('intro');
  const [contentOpacity, setContentOpacity] = useState(0);
  
  // Handle the completion of the cube wave animation
  const handleIntroComplete = useCallback(() => {
    // Immediately start fading in content
    setContentOpacity(1);
    
    // Switch to content immediately
    setSequenceStep('content');
  }, []);

  // Handle sequence timing
  useEffect(() => {
    // Start with intro
    setSequenceStep('intro');
    setContentOpacity(0);
  }, []);
  
  return (
    <div className="relative">
      {/* Black background - lowest z-index */}
      <div className="fixed inset-0 w-full h-full -z-50 bg-black"></div>
      
      {/* Intro animation - always visible during intro step */}
      {sequenceStep === 'intro' && (
        <div className="relative z-10">
          <CubeWaveIntro 
            duration={3.5} 
            onComplete={handleIntroComplete} 
            colors={['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32']} 
            cubeSize={40} 
            borderWidth={2} 
          />
        </div>
      )}
      
      {/* Content - fades in after intro */}
      <div 
        className="transition-opacity duration-1000 ease-in-out relative z-0"
        style={{ opacity: contentOpacity }}
      >
        {/* Interactive Pixel Wave Effect - position absolute instead of fixed */}
        <div className="absolute inset-0 h-full w-full -z-10">
          <PixelWave 
            colors={['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32']} 
            pixelSize={20} 
            minPixelSize={10}
            maxPixelSize={30}
            speed={1.1} 
            fade={0.15} 
            direction="down"
            borderWidth={2}
            explosionRadius={150}
            mouseTracking={true} 
          />
        </div>
        
        {/* Content Sections */}
        <Hero content={heroContent} />
        <ServicesGrid items={servicesItems} />
        <JarvisModel />
        <ProjectsShowcase />
        <TeamSection members={teamMembers} />
        <FAQTeaser faqs={faqItems} />
        
        {/* Space for footer */}
        <div className="h-40"></div>
      </div>
    </div>
  );
}
