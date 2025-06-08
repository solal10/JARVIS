import React from 'react';

export default function JarvisModel() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-white text-center">Le Modèle Jarvis</h2>
          
          <div className="space-y-12">
            <div className="backdrop-blur-sm border border-jarvisGold/40 rounded-lg p-6 shadow-xl h-full flex flex-col prose prose-invert prose-jarvis max-w-none overflow-hidden relative">
              <div className="absolute top-2 right-2 w-12 h-12 bg-jarvisGold/10 rounded-full blur-lg"></div>
              <div className="absolute bottom-2 left-2 w-16 h-16 bg-monacoBlue/30 rounded-full blur-lg"></div>
              <p className="text-lg text-gray-300 leading-relaxed">
                Que vous soyez investisseur à la recherche d&apos;opportunités à la fois sûres et performantes, ou start-up en quête de ressources pour passer de la simple idée au lancement concret, notre modèle économique hybride a été pensé pour vous réunir autour d&apos;un même objectif : faire éclore l&apos;innovation sans jamais compromettre votre capital.
              </p>

              <p className="text-lg font-medium text-white mt-8 mb-6">
                Dès le démarrage du projet, nous mettons en place un cadre clair et partagé :
              </p>

              <ul className="space-y-4 text-gray-300 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-jarvisGold mr-3">•</span>
                  <span>Pour l&apos;investisseur, cela signifie un capital initial 100 % garanti, préservé tant que les résultats ne sont pas au rendez-vous.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-jarvisGold mr-3">•</span>
                  <span>Pour l&apos;entrepreneur, c&apos;est la promesse d&apos;un financement progressif, débloqué uniquement au franchissement de chaque jalon validé, pour avancer pas à pas en toute sérénité.</span>
                </li>
              </ul>

              <p className="text-gray-300 mt-8 leading-relaxed">
                À chaque phase clé — de la validation du prototype à la première traction utilisateur — notre équipe apporte son expertise (technique, marketing, business) et ouvre l&apos;accès à des ressources nouvelles. Quand votre projet prouve sa viabilité, nous créons ensemble une structure dédiée où investisseurs et porteurs de projets deviennent associés, partageant équitablement le succès et les perspectives de croissance future.
              </p>

              <blockquote className="border-l-4 border-jarvisGold pl-6 my-8 italic text-xl text-white/90">
                « Ici, votre capital reste inviolable ; seul le succès mérite d&apos;être récompensé. »
              </blockquote>

              <p className="text-gray-300 leading-relaxed">
                Rejoignez un dispositif hybride où sécurité et agilité se conjuguent pour nourrir vos ambitions, qu&apos;elles soient financières ou entrepreneuriales. Prêts à écrire la prochaine page de votre réussite ? Parlons-en dès aujourd&apos;hui.
              </p>

              <div className="mt-12 text-center">
                <a 
                  href="/contact" 
                  className="inline-block bg-white hover:bg-jarvisGold text-black font-bold py-4 px-10 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(201,161,61,0.6)] text-lg"
                >
                  Discuter de votre projet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
