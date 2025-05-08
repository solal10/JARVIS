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
    <section className="w-full bg-monacoBlue text-white py-24 px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {content.h1}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          {content.p}
        </p>
        <a
          href={content.buttonPrimary.href}
          className={`inline-block ${content.buttonPrimary.color ? `bg-${content.buttonPrimary.color}` : 'bg-jarvisGold'} hover:bg-opacity-90 text-monacoBlue font-bold py-3 px-8 rounded-md transition-all duration-300`}
        >
          {content.buttonPrimary.text}
        </a>
      </div>
    </section>
  );
}
