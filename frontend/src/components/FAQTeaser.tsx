"use client";

import React, { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQTeaserProps {
  faqs: FAQItem[];
}

export default function FAQTeaser({ faqs }: FAQTeaserProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-monacoBlue/95 text-white">
      <div className="container mx-auto max-w-4xl py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Questions fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-monacoBlue shadow-md rounded-lg overflow-hidden border border-jarvisGold/40">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 flex justify-between items-center focus:outline-none hover:bg-jarvisGold/20 transition-all duration-300 border-l-4 border-transparent hover:border-jarvisGold"
              >
                <h3 className="text-xl font-semibold text-white">{faq.q}</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}
              >
                <p className="p-5 pt-0 text-white text-opacity-90">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a 
            href="/faq" 
            className="inline-flex items-center bg-white hover:bg-jarvisGold text-black font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(201,161,61,0.6)]"
          >
            Voir toutes les questions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
