import { Metadata } from 'next';
import HeroContact from '@/components/HeroContact';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import MapEmbed from '@/components/MapEmbed';
import PixelWave from '@/components/PixelWave';

export const metadata: Metadata = {
  title: "Contact — SARL JARVIS",
  description: "Contactez la SARL JARVIS pour vos projets IT sur-mesure à Monaco",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <PixelWave />
      <div className="relative z-10">
        <HeroContact />
        <ContactForm />
        <ContactInfo />
        <MapEmbed />
      </div>
    </div>
  );
}
