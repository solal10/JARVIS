import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  logo: {
    text: string;
    href: string;
  };
  links: Array<{
    text: string;
    href: string;
  }>;
}

export default function NavBar({ logo, links }: NavBarProps) {
  return (
    <header className="sticky top-0 bg-white text-monacoBlue shadow-md py-4 px-6 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href={logo.href} className="text-2xl font-bold">
            {logo.text}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className="font-medium hover:text-jarvisGold transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation Button */}
          <button className="md:hidden p-2 rounded-md bg-white hover:bg-jarvisGold text-monacoBlue transition-all duration-300 transform hover:scale-105 shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_15px_rgba(201,161,61,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
