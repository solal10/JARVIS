import React from 'react';
import HeroAbout from '../../components/HeroAbout';
import CompanyStory from '../../components/CompanyStory';
import TeamGrid from '../../components/TeamGrid';
import ValuesList from '../../components/ValuesList';
import CTAAbout from '../../components/CTAAbout';
import PixelWave from '../../components/PixelWave';

export const metadata = {
  title: "À-propos — SARL JARVIS",
  description: "Découvrez l'histoire, l'équipe et la vision de SARL JARVIS, entreprise monégasque spécialisée dans le développement logiciel et l'installation matérielle.",
};

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen relative">
      {/* PixelWave background animation (already declared globally) */}
      <div className="fixed inset-0 z-0 opacity-80">
        <PixelWave
          colors={['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32']}
          pixelSize={20}
          speed={1.1}
          fade={0.15}
          mouseTracking={true}
          initialEnabled={true}
        />
      </div>
      
      {/* Fixed decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-monacoBlue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-jarvisGold/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header with subtle separator */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-jarvisGold/30 to-transparent"></div>
        
        {/* Page content */}
        <main>
          <HeroAbout />
          <CompanyStory />
          <TeamGrid />
          <ValuesList />
          <CTAAbout />
        </main>
        
        {/* Footer with subtle separator */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-monacoBlue/30 to-transparent"></div>
      </div>
    </div>
  );
}
