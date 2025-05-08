import React from 'react';
import Image from 'next/image';

interface TeamMember {
  image: string;
  name: string;
  role: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="py-24 px-6 bg-transparent text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Notre équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div 
              key={index}
              className="bg-monacoBlue/85 rounded-lg shadow-xl border border-jarvisGold/40 p-6 text-center transition-all hover:transform hover:scale-105 backdrop-blur-sm"
            >
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 relative">
                {/* Placeholder for team member image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {member.image ? (
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">{member.name[0]}</span>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
              <p className="text-white/80">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
