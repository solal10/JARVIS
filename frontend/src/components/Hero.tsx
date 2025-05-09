import React from 'react';

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
    <section className="w-full bg-transparent text-white py-36 px-6 md:py-32 lg:py-36 relative">
      <div className="container mx-auto text-center max-w-4xl py-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {content.h1}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {content.p}
        </p>
        <a
          href={content.buttonPrimary.href}
          className="inline-block bg-white hover:bg-jarvisGold text-black font-bold py-4 px-10 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(201,161,61,0.6)] text-lg"
        >
          {content.buttonPrimary.text}
        </a>
      </div>
    </section>
  );
}
