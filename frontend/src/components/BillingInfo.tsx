import React from 'react';

export default function BillingInfo() {
  return (
    <a
      href="/docs/jarvis-rib.pdf"
      download
      className="inline-flex items-center px-6 py-3 bg-monacoBlue hover:bg-monacoBlue/80 text-white font-semibold rounded-lg transition-colors"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Télécharger RIB
    </a>
  );
}
