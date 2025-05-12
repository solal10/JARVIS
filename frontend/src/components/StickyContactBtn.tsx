"use client";

import React from 'react';
import Link from 'next/link';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';

export default function StickyContactBtn() {
  return (
    <div className="fixed right-6 z-[100] flex flex-col items-end gap-4" style={{ bottom: '5rem' }}>
      <Link
        href="/contact"
        className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/90 text-black font-semibold rounded-full shadow-xl transition-all duration-300 border-2 border-white/20"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
        <span>Contact</span>
      </Link>
    </div>
  );
}
