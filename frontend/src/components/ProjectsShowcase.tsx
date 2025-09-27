import React from 'react';
import Image from 'next/image';

interface Project {
  name: string;
  description: string;
  imagePath: string;
  url: string;
}

const projects: Project[] = [
  {
    name: 'Brikka',
    description: 'Plateforme intelligente qui transforme la gestion immobilière en une expérience fluide et performante. Grâce à l\'IA, elle simplifie le suivi des biens, locataires et loyers.',
    imagePath: '/images/brikka.png',
    url: 'https://brikka.app',
  },
  {
    name: 'AVA',
    description: 'Coach santé intelligent qui analyse vos données de bien-être grâce à l\'IA. AVA s\'adapte à vos habitudes pour offrir des recommandations personnalisées et proactives.',
    imagePath: '/images/Ava.png',
    url: 'https://myava.health',
  },
  {
    name: 'Villa Azaï Tù',
    description: 'Jarvis signe l\'univers digital, orchestre les installations techniques et valorise la commercialisation de cette villa d\'exception sur les plus belles plateformes internationales.',
    imagePath: '/images/villa_azai_tu.png',
    url: 'https://villaazaitu.com/la-villa/',
  },
];

export default function ProjectsShowcase() {
  return (
    <section className="py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Nos Projets</h2>
          <p className="text-xl text-gray-300">
            Découvrez quelques-unes de nos réalisations récentes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-white/10 rounded-lg overflow-hidden border border-white/20 backdrop-blur-sm"
            >
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.imagePath}
                    alt={`Capture d'écran du projet ${project.name} - ${project.description.split('.')[0]}`}
                    width={400}
                    height={300}
                    className={`w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                      project.name === 'Villa Azaï Tù' ? 'object-contain bg-black scale-150' : 'object-cover'
                    }`}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-jarvisGold group-hover:text-white transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-300">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center text-jarvisGold group-hover:text-white transition-colors">
                    <span>Voir le projet</span>
                    <svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
