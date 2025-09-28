"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Hero from './Hero';
import CubeWaveIntro from './CubeWaveIntro';
import PixelWave from './PixelWave';
import ServicesGrid from './ServicesGrid';
import TeamSection from './TeamSection';
import FAQTeaser from './FAQTeaser';
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
  const [components, setComponents] = useState<{
    CubeWaveIntro?: React.ComponentType<any>;
    PixelWave?: React.ComponentType<any>;
    ServicesGrid?: React.ComponentType<any>;
    TeamSection?: React.ComponentType<any>;
    FAQTeaser?: React.ComponentType<any>;
    ProjectsShowcase?: React.ComponentType<any>;
  }>({});
  const [componentsLoaded, setComponentsLoaded] = useState(false);
  
  // Handle the completion of the cube wave animation
  const handleIntroComplete = useCallback(() => {
    // Fade out intro animation
    setSequenceStep('content');
  }, []);


  // Load components et start content early for LCP
  useEffect(() => {
    // Start with intro
    setSequenceStep('intro');

    // Load intro component
    const loadIntro = async () => {
      const CubeWaveIntroModule = await import('./CubeWaveIntro');
      setComponents(prev => ({
        ...prev,
        CubeWaveIntro: CubeWaveIntroModule.default
      }));
    };

    loadIntro();

    // Load content components immediately for better LCP
    setTimeout(async () => {
      const [
        PixelWaveModule,
        ServicesGridModule,
        TeamSectionModule,
        FAQTeaserModule,
        ProjectsShowcaseModule
      ] = await Promise.all([
        import('./PixelWave'),
        import('./ServicesGrid'),
        import('./TeamSection'),
        import('./FAQTeaser'),
        import('./ProjectsShowcase')
      ]);

      setComponents(prev => ({
        ...prev,
        PixelWave: PixelWaveModule.default,
        ServicesGrid: ServicesGridModule.default,
        TeamSection: TeamSectionModule.default,
        FAQTeaser: FAQTeaserModule.default,
        ProjectsShowcase: ProjectsShowcaseModule.default
      }));

      setComponentsLoaded(true);
    }, 0); // Immédiat
  }, []);
  
  return (
    <div className="relative">
      {/* Black background - lowest z-index */}
      <div className="fixed inset-0 w-full h-full -z-50 bg-black"></div>
      
      {/* Content - always visible for LCP */}
      <div className="relative z-0">
        {/* Interactive Pixel Wave Effect - lazy loaded */}
        <div className="absolute inset-0 h-full w-full -z-10">
          {components.PixelWave && (
            <components.PixelWave
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
          )}
        </div>

        {/* Content Sections - Hero prioritized for LCP */}
        <div className="relative">
          <Hero content={heroContent} />
        </div>

        {/* Autres composants - lazy loaded */}
        {componentsLoaded && (
          <>
            {components.ServicesGrid && (
              <components.ServicesGrid items={servicesItems} />
            )}
            {components.ProjectsShowcase && (
              <components.ProjectsShowcase />
            )}
            {components.TeamSection && (
              <components.TeamSection members={teamMembers} />
            )}
            {components.FAQTeaser && (
              <components.FAQTeaser faqs={faqItems} />
            )}
          </>
        )}

        {/* Space for footer */}
        <div className="h-40"></div>
      </div>

      {/* Intro animation - overlay on top for performance */}
      {sequenceStep === 'intro' && components.CubeWaveIntro && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <components.CubeWaveIntro
            duration={2.5}
            onComplete={handleIntroComplete}
            colors={['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32']}
            cubeSize={40}
            borderWidth={2}
          />
        </div>
      )}
    </div>
  );
}
