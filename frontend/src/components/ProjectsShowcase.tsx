import React from 'react';

interface Project {
  name: string;
  description: string;
  imagePath: string;
  url: string;
}

const projects: Project[] = [
  {
    name: 'MyWer',
    description: 'Application d\'inventaire intelligente',
    imagePath: 'https://placehold.co/600x400/0053A4/FFFFFF?text=MyWer',
    url: '#',
  },
  {
    name: 'TrakIA',
    description: 'Gestion de véhicules connectés',
    imagePath: 'https://placehold.co/600x400/0053A4/FFFFFF?text=TrakIA',
    url: '#',
  },
  {
    name: 'HookReplay',
    description: 'Webhook Replay as a service',
    imagePath: 'https://placehold.co/600x400/0053A4/FFFFFF?text=HookReplay',
    url: '#',
  },
];

export default function ProjectsShowcase() {
  return (
    <section className="py-24 px-6 bg-monacoBlue">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Nos Projets</h2>
          <p className="text-xl text-gray-300">
            Découvrez quelques-unes de nos réalisations récentes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  <img 
                    src={project.imagePath} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
