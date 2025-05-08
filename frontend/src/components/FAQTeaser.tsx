import React from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQTeaserProps {
  faqs: FAQItem[];
}

export default function FAQTeaser({ faqs }: FAQTeaserProps) {
  return (
    <section className="py-16 px-6 text-monacoBlue">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-monacoBlue">Questions fréquentes</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-monacoBlue">{faq.q}</h3>
              <p className="text-monacoBlue text-opacity-80">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a 
            href="/faq" 
            className="inline-flex items-center text-monacoBlue font-semibold hover:text-jarvisGold transition-colors"
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
