"use client";

import React from 'react';

export default function MapEmbed() {
  return (
    <section className="container mx-auto px-6 my-12">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2893.0670691357093!2d7.4225!3d43.7340!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdc2cba5b6bcb1%3A0xaaa!2s2%20Rue%20Du%20Gabian%2C%2098000%20Monaco!5e0!3m2!1sfr!2s!4v0000000000000"
        className="w-full h-64 rounded-lg shadow-xl border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
