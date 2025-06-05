"use client";

import React from 'react';

interface BaseHeroProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function BaseHero({ title, subtitle, children }: BaseHeroProps) {
  return (
    <section className="relative flex items-center justify-center min-h-[60vh] py-32 px-6 text-white overflow-hidden">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        {children}
      </div>
    </section>
  );
}
