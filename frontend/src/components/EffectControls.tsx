"use client";

import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/solid';

export default function EffectControls() {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  
  const toggleEffects = () => {
    const newState = !effectsEnabled;
    setEffectsEnabled(newState);
    const event = new CustomEvent('togglePixelWave', { 
      detail: { enabled: newState },
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(event);
  };

  return (
    <button 
      onClick={toggleEffects}
      className="fixed bottom-4 right-4 z-[100] flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-black font-semibold rounded-full shadow-xl transition-all duration-300 border-2 border-white/20"
      aria-label={effectsEnabled ? 'Disable animation' : 'Enable animation'}
    >
      <EyeIcon className="w-5 h-5" />
      {effectsEnabled ? 'Disable Effect' : 'Enable Effect'}
    </button>
  );
}
