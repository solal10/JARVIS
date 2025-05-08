import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AboutTeaserProps {
  image: string;
  text: string;
  link: {
    text: string;
    href: string;
  };
}

export default function AboutTeaser({ image, text, link }: AboutTeaserProps) {
  return (
    <section className="py-20 px-6 bg-white text-monacoBlue">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 relative">
            {/* We'll use a placeholder div for now since the image doesn't exist yet */}
            <div className="w-full h-80 bg-gray-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Image: {image}
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="text-xl mb-6 text-monacoBlue">{text}</p>
            <Link 
              href={link.href}
              className="inline-flex items-center text-monacoBlue font-semibold hover:text-jarvisGold transition-colors"
            >
              {link.text}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
