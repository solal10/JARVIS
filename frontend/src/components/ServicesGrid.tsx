import React from 'react';

interface ServiceItem {
  title: string;
  icon: string;
  description: string;
}

interface ServicesGridProps {
  items: ServiceItem[];
}

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'code':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'device':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'support':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-jarvisGold mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ServicesGrid({ items }: ServicesGridProps) {
  return (
    <section className="py-24 px-6 bg-transparent text-white">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-monacoBlue/85 rounded-lg shadow-lg p-6 border border-jarvisGold/40 flex flex-col items-center text-center transition-all hover:transform hover:scale-105 backdrop-blur-sm"
            >
              <IconComponent icon={item.icon} />
              <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
              <p className="text-white text-opacity-80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
