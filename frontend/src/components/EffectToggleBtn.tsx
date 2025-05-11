"use client";

import React from 'react';
import { EyeIcon } from '@heroicons/react/24/solid';

export default function EffectToggleBtn() {
  return (
    <button
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-black font-semibold rounded-full shadow-xl transition-all duration-300 border-2 border-white/20"
      aria-label="Enable animation"
    >
      <EyeIcon className="w-5 h-5" />
      <span>Enable Effect</span>
    </button>
  );
}
