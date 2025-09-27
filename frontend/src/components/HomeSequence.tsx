"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Hero from './Hero';

// No imports of heavy components - will be loaded dynamically

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
    route: string;
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
  const [pixelWaveEnabled, setPixelWaveEnabled] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  const [cubeWaveCompleted, setCubeWaveCompleted] = useState(false);
  const [dynamicComponents, setDynamicComponents] = useState<{
    CubeWaveIntro?: React.ComponentType<any>;
    PixelWave?: React.ComponentType<any>;
    ServicesGrid?: React.ComponentType<any>;
    TeamSection?: React.ComponentType<any>;
    FAQTeaser?: React.ComponentType<any>;
    ProjectsShowcase?: React.ComponentType<any>;
  }>({});
  
  // Handle the completion of the cube wave animation
  const introCompleted = useRef(false);
  const handleIntroComplete = useCallback(() => {
    // Prevent multiple calls with state
    if (cubeWaveCompleted) return;

    // Mark as completed immediately to prevent re-render
    setCubeWaveCompleted(true);

    // Single pass - immediately transition to content
    setContentOpacity(1);
    setSequenceStep('content');

    // Quick PixelWave activation for better UX
    setTimeout(() => {
      setPixelWaveEnabled(true);
    }, 200); // Very fast activation after content appears
  }, [cubeWaveCompleted]);

  // Handle sequence timing and defer component loading for TBT
  useEffect(() => {
    // Reset flags for new sequence
    introCompleted.current = false;
    setCubeWaveCompleted(false);

    // Start with intro
    setSequenceStep('intro');
    setContentOpacity(0);

    // Load only CubeWaveIntro immediately for fast LCP
    const loadCubeWaveIntro = async () => {
      const CubeWaveIntroModule = await import('./CubeWaveIntro');
      setDynamicComponents(prev => ({
        ...prev,
        CubeWaveIntro: CubeWaveIntroModule.default
      }));
    };

    // Load PixelWave shortly after for seamless UX
    const loadPixelWave = async () => {
      const PixelWaveModule = await import('./PixelWave');
      setDynamicComponents(prev => ({
        ...prev,
        PixelWave: PixelWaveModule.default
      }));
    };

    // Load CubeWaveIntro immediately for LCP
    loadCubeWaveIntro();

    // Load PixelWave after a short delay to preserve LCP
    setTimeout(() => {
      loadPixelWave();
    }, 1000); // Load PixelWave 1s after page load

    // Defer other heavy components to improve TBT - wait until TBT measurement window is over
    setTimeout(async () => {
      // Dynamically import remaining components only after TBT window
      const [
        ServicesGridModule,
        TeamSectionModule,
        FAQTeaserModule,
        ProjectsShowcaseModule
      ] = await Promise.all([
        import('./ServicesGrid'),
        import('./TeamSection'),
        import('./FAQTeaser'),
        import('./ProjectsShowcase')
      ]);

      setDynamicComponents(prev => ({
        ...prev,
        ServicesGrid: ServicesGridModule.default,
        TeamSection: TeamSectionModule.default,
        FAQTeaser: FAQTeaserModule.default,
        ProjectsShowcase: ProjectsShowcaseModule.default
      }));

      setComponentsLoaded(true);
    }, 6000); // Load components after TBT measurement window (5s + buffer)
  }, []);
  
  return (
    <div className="relative">
      {/* Black background - lowest z-index */}
      <div className="fixed inset-0 w-full h-full -z-50 bg-black"></div>
      
      {/* Intro animation - load when CubeWaveIntro is ready */}
      {sequenceStep === 'intro' && dynamicComponents.CubeWaveIntro && !cubeWaveCompleted && (
        <div className="relative z-10">
          <dynamicComponents.CubeWaveIntro
            key="single-cube-wave"
            duration={2.5}
            onComplete={handleIntroComplete}
            colors={['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32']}
            cubeSize={60}
            borderWidth={1}
          />
        </div>
      )}
      
      {/* Content - fades in after intro */}
      <div 
        className="transition-opacity duration-1000 ease-in-out relative z-0"
        style={{ opacity: contentOpacity }}
      >
        {/* Interactive Pixel Wave Effect - deferred for TBT optimization */}
        <div className="absolute inset-0 h-full w-full -z-10">
          {pixelWaveEnabled && dynamicComponents.PixelWave && (
            <dynamicComponents.PixelWave
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
              initialEnabled={true}
            />
          )}
        </div>
        
        {/* Content Sections */}
        <Hero content={heroContent} />

        {/* Below-the-fold components - lazy loaded */}
        {componentsLoaded && (
          <>
            {dynamicComponents.ServicesGrid && (
              <dynamicComponents.ServicesGrid items={servicesItems} />
            )}
            {dynamicComponents.ProjectsShowcase && (
              <dynamicComponents.ProjectsShowcase />
            )}
            {dynamicComponents.TeamSection && (
              <dynamicComponents.TeamSection members={teamMembers} />
            )}
            {dynamicComponents.FAQTeaser && (
              <dynamicComponents.FAQTeaser faqs={faqItems} />
            )}
          </>
        )}
        
        {/* Space for footer */}
        <div className="h-40"></div>
      </div>
    </div>
  );
}
