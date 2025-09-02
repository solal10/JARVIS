"use client";

import React from 'react';

export default function ContactInfo() {
  return (
    <section className="py-8 text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-jarvisGold">Siège social</h2>
        <div className="space-y-2 text-lg">
          <p className="font-semibold">SARL JARVIS</p>
          <p>2 Rue Du Gabian</p>
          <p>98000 Monaco</p>
          <p>Tél. : +33.6.66.38.05.14</p>
          <p>Tél. : +33.6.67.63.87.29</p>
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
