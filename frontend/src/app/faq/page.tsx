import React from 'react';
import HeroFAQ from '@/components/HeroFAQ';
import FAQsAccordion from '@/components/FAQsAccordion';
import CTAContact from '@/components/CTAContact';
import PixelWave from '@/components/PixelWave';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — SARL JARVIS',
  description: 'Foire aux questions - Toutes les réponses à vos interrogations sur les services de la SARL JARVIS',
};

export default function FAQPage() {
  return (
    <div className="relative min-h-screen">
      <PixelWave />
      <div className="relative z-10">
        <HeroFAQ />
        <FAQsAccordion />
        <CTAContact 
          title="Vous avez encore des questions ?"
          buttonLabel="Nous contacter"
          buttonUrl="/contact"
          className="py-16"
        />
      </div>
    </div>
  );
}
