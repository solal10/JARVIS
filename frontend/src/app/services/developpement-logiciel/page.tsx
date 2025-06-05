"use client";

import React from 'react';
import BaseHero from '@/components/BaseHero';

export default function DevelopmentService() {
  return (
    <div>
      <BaseHero
        title="Développement logiciel"
        subtitle="Applications web & mobiles sur‑mesure avec architecture cloud scalable."
      />
      <section className="py-24 px-6 bg-transparent text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 