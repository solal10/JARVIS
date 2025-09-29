import React from 'react';
import BaseHero from './BaseHero';

interface HeroProps {
  content: {
    h1: string;
    p: string;
    buttonPrimary: {
      text: string;
      href: string;
      color?: string;
      style: 'solid' | 'outline';
    };
  };
}

export default function Hero({ content }: HeroProps) {
  return (
    <BaseHero
      title={content.h1}
      subtitle={content.p}
    >
      <a
        href={content.buttonPrimary.href}
        className="inline-block bg-white hover:bg-jarvisGold text-black font-bold py-4 px-10 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(201,161,61,0.6)] text-lg focus:ring-2 focus:ring-jarvisGold focus:ring-opacity-50 focus:outline-none"
        aria-label={`${content.buttonPrimary.text} - Accéder au formulaire de contact`}
      >
        {content.buttonPrimary.text}
      </a>
    </BaseHero>
  );
}
