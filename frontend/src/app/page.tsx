import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import TeamSection from "../components/TeamSection";
import FAQTeaser from "../components/FAQTeaser";
import PixelWave from "../components/PixelWave";

export const metadata = {
  title: "SARL JARVIS – Solutions IT sur‑mesure",
  description: "Solutions logicielles & installations IT sur‑mesure à Monaco et à l'international",
};

export default function Home() {
  // Hero content
  const heroContent = {
    h1: "Solutions logicielles & installations IT sur‑mesure",
    p: "SARL JARVIS conçoit, développe et intègre vos systèmes informatiques, à Monaco et à l'international.",
    buttonPrimary: {
      text: "Demander un devis",
      href: "#contact",
      color: "jarvisGold",
      style: "solid" as "solid" | "outline",
    },
  };

  // Services content
  const servicesItems = [
    { 
      title: "Développement logiciel", 
      icon: "code", 
      description: "Applications web & mobiles sur‑mesure." 
    },
    { 
      title: "Installation matériel", 
      icon: "device", 
      description: "Caméras, TV, ordinateurs avec logiciels pré‑configurés." 
    },
    { 
      title: "Support & maintenance", 
      icon: "support", 
      description: "Contrats de maintenance et monitoring 24/7." 
    }
  ];

  // Team section content
  const teamMembers = [
    { image: "/images/team1.jpg", name: "Thomas Benichou", role: "Gérant associé" },
    { image: "/images/team2.jpg", name: "Sacha Benichou", role: "Gérant associé" },
    { image: "/images/team3.jpg", name: "Équipe Dev", role: "Développement" }
  ];

  // NavBar content
  const navBarContent = {
    logo: { text: "SARL JARVIS", href: "/" },
    links: [
      { text: "Accueil", href: "/" },
      { text: "Services", href: "/services" },
      { text: "À propos", href: "/a-propos" },
      { text: "Contact", href: "/contact" }
    ]
  };

  // FAQ teaser content
  const faqItems = [
    { 
      q: "Travaillez‑vous hors de Monaco ?", 
      a: "Oui, nous intervenons à l'international pour les projets logiciels et matériels." 
    },
    { 
      q: "Quel est le délai moyen d'un projet ?", 
      a: "Entre 4 et 12 semaines selon la complexité." 
    },
    { 
      q: "Proposez‑vous un support 24 / 7 ?", 
      a: "Option de contrat de maintenance premium disponible." 
    }
  ];

  return (
    <div className="bg-transparent min-h-screen">
      <PixelWave 
        colors={['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32']} 
        pixelSize={4} 
        speed={1.4} 
        fade={0.08} 
        mouseTracking={true} 
      />
      <Hero content={heroContent} />
      <ServicesGrid items={servicesItems} />
      <TeamSection members={teamMembers} />
      <FAQTeaser faqs={faqItems} />
    </div>
  );
}
