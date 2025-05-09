import HomeSequence from "../components/HomeSequence";

export const metadata = {
  title: "SARL JARVIS – Solutions IT sur-mesure",
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

  // Team section content
  const teamMembers = [
    { image: "/images/team1.jpg", name: "Thomas Benichou", role: "Gérant associé" },
    { image: "/images/team2.jpg", name: "Sacha Benichou", role: "Gérant associé" },
    { image: "/images/team3.jpg", name: "Équipe Dev", role: "Développement" }
  ];

  // NavBar content is now handled directly in the layout.tsx file

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
    <div className="bg-black min-h-screen">
      <HomeSequence
        heroContent={heroContent}
        servicesItems={servicesItems}
        teamMembers={teamMembers}
        faqItems={faqItems}
      />
    </div>
  );
}
