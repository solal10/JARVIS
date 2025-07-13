import React from 'react';
import HeroAbout from '../../components/HeroAbout';
import CompanyStory from '../../components/CompanyStory';
import TeamSection from '../../components/TeamSection';
import ValuesList from '../../components/ValuesList';
import CTAAbout from '../../components/CTAAbout';
import PixelWave from '../../components/PixelWave';

export const metadata = {
  title: "À-propos — SARL JARVIS",
  description: "Découvrez l'histoire, l'équipe et la vision de SARL JARVIS, entreprise monégasque spécialisée dans le développement logiciel et l'installation matérielle.",
};

const teamMembers = [
  { 
    image: "/images/team1.jpg", 
    name: "Thomas Benichou", 
    role: "Associé",
    quote: "Toujours à fond, j'allie créativité et stratégie pour envoyer vos start-ups vers de nouveaux records",
    bio: "Spécialiste de la gestion de start-ups et du développement stratégique, Thomas pilote la croissance de l'entreprise en identifiant de nouvelles opportunités et en optimisant les processus internes. Il accompagne les porteurs de projet de la phase d'idéation jusqu'au déploiement opérationnel, garantissant agilité et performance à chaque étape.",
    social: {
      linkedin: "https://www.linkedin.com/in/thomas-benichou-479816172?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    }
  },
  { 
    image: "/images/team2.jpg", 
    name: "Sacha Benichou", 
    role: "Gérant associé",
    quote: "La finance, c'est mon terrain de jeu : je transforme vos bilans en moteur de croissance",
    bio: "Expert en gestion financière, Sacha élabore des plans de financement sur-mesure et supervise la trésorerie pour assurer la stabilité et la rentabilité de nos opérations. Son sens aigu de l'analyse et sa maîtrise des outils financiers permettent d'anticiper les risques et de saisir les leviers de croissance.",
    social: {
      linkedin: "https://www.linkedin.com/in/sacha-benichou-19b140225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    }
  },
  { 
    image: "/images/team3.jpg", 
    name: "Solal Ohana", 
    role: "Directeur Technique",
    quote: "L'innovation technique est au cœur de chaque solution que nous créons",
    bio: "En tant que Directeur Technique, Solal dirige l'ensemble des développements logiciels et l'architecture technique de nos solutions. Son expertise en développement full-stack et sa vision stratégique permettent de concevoir des systèmes robustes, évolutifs et performants qui répondent aux besoins les plus exigeants de nos clients.",
    social: {
      linkedin: "https://www.linkedin.com/in/solal-ohana?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    }
  }
];

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen relative">
      {/* PixelWave background animation */}
      <div className="fixed inset-0 z-0 opacity-80">
        <PixelWave
          colors={['#C9A13D', '#0053A4', '#ff4d4d', '#32cd32']}
          pixelSize={20}
          speed={1.1}
          fade={0.15}
          mouseTracking={true}
          initialEnabled={true}
        />
      </div>
      
      {/* Fixed decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-monacoBlue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-jarvisGold/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Page content */}
        <main className="space-y-24 py-12">
          <section className="container mx-auto px-6">
          <HeroAbout />
          </section>

          <section className="container mx-auto px-6">
          <CompanyStory />
          </section>

          <section className="container mx-auto px-6">
            <TeamSection members={teamMembers} />
          </section>

          <section className="container mx-auto px-6">
          <ValuesList />
          </section>

          <section className="container mx-auto px-6">
          <CTAAbout />
          </section>
        </main>
        
        {/* Footer with subtle separator */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-monacoBlue/30 to-transparent"></div>
      </div>
    </div>
  );
}
