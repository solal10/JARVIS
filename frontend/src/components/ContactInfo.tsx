"use client";

import React from 'react';

export default function ContactInfo() {
  return (
    <section className="py-8 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-jarvisGold">Siège social</h2>
        <div className="space-y-2 text-lg">
          <p className="font-semibold">SARL JARVIS</p>
          <p>2, rue du Gabian – c/o IBC</p>
          <p>98000 Monaco</p>
          <p>Tél. : +377 99 99 99 99</p>
          <p>
            E-mail :{' '}
            <a 
              href="mailto:info@jarvis.mc" 
              className="text-jarvisGold hover:text-jarvisGold/80 transition-colors"
            >
              info@jarvis.mc
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
