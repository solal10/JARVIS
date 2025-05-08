import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import AboutTeaser from "../components/AboutTeaser";
import FAQTeaser from "../components/FAQTeaser";

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

  // About teaser content
  const aboutContent = {
    image: "/images/team.jpg",
    text: "Fondée en 2024 à Monaco, SARL JARVIS réunit des experts IT pour accompagner votre transformation numérique.",
    link: { 
      text: "En savoir plus", 
      href: "/a-propos" 
    }
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
    <>
      <Hero content={heroContent} />
      <ServicesGrid items={servicesItems} />
      <AboutTeaser {...aboutContent} />
      <FAQTeaser faqs={faqItems} />
    </>
  );
}
