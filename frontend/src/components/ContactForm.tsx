"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    msg: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', msg: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-12 px-6">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white mb-2">Nom *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-monacoBlue/70 text-white border border-jarvisGold/40 focus:border-jarvisGold focus:ring-1 focus:ring-jarvisGold focus:outline-none transition-colors placeholder:text-white/50"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white mb-2">E-mail *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-monacoBlue/70 text-white border border-jarvisGold/40 focus:border-jarvisGold focus:ring-1 focus:ring-jarvisGold focus:outline-none transition-colors placeholder:text-white/50"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-white mb-2">Téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-monacoBlue/70 text-white border border-jarvisGold/40 focus:border-jarvisGold focus:ring-1 focus:ring-jarvisGold focus:outline-none transition-colors placeholder:text-white/50"
              placeholder="+377 99 99 99 99"
            />
          </div>

          <div>
            <label htmlFor="msg" className="block text-white mb-2">Votre message *</label>
            <textarea
              id="msg"
              name="msg"
              required
              value={formData.msg}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 rounded-md bg-monacoBlue/70 text-white border border-jarvisGold/40 focus:border-jarvisGold focus:ring-1 focus:ring-jarvisGold focus:outline-none transition-colors placeholder:text-white/50 resize-none"
              placeholder="Décrivez votre projet..."
            />
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-md text-green-200">
            Message envoyé avec succès ! Nous vous recontacterons dans les plus brefs délais.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-md text-red-200">
            Une erreur est survenue. Veuillez réessayer ultérieurement.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-jarvisGold hover:bg-jarvisGold/80 text-black font-bold rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </section>
  );
}
