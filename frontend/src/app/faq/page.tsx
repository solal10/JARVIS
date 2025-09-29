import React from 'react';
import HeroFAQ from '@/components/HeroFAQ';
import FAQsAccordion from '@/components/FAQsAccordion';
import CTAContact from '@/components/CTAContact';
import PixelWave from '@/components/PixelWave';
import { Metadata } from 'next';
import { faqSchema } from './faq-schema';

export const metadata: Metadata = {
  title: 'FAQ Développement Logiciel & Audit IA France | Questions Fréquentes JARVIS',
  description: 'FAQ JARVIS : questions fréquentes développement logiciel, audit IA, web-marketing, start-ups. Réponses expert IT France, interventions distance, basé Monaco.',
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative min-h-screen">
      {/* PixelWave background animation */}
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

      <div className="relative z-10">
        <main className="space-y-24 py-12">
          <section className="container mx-auto px-6">
        <HeroFAQ />
          </section>

          <section className="container mx-auto px-6">
        <FAQsAccordion />
          </section>

          <section className="container mx-auto px-6">
        <CTAContact 
          title="Vous avez encore des questions ?"
          buttonLabel="Nous contacter"
          buttonUrl="/contact"
          className="py-16"
        />
          </section>
        </main>
      </div>
    </div>
    </>
  );
}
