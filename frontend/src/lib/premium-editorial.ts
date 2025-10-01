// Templates éditoriaux premium niveau Financial Times / Les Échos

import { MarketIntelligenceService } from './market-intelligence';
import { NewsAndTrendsService } from './news-fetcher';

interface EditorialStructure {
  chapeau: string;
  lead: string;
  sections: {
    title: string;
    content: string;
    type: 'analysis' | 'data' | 'expert-opinion' | 'case-study' | 'outlook';
  }[];
  conclusion: string;
}

export class PremiumEditorialService {

  static generatePremiumArticle(topic: string, category: string): {
    title: string;
    excerpt: string;
    content: string;
  } {
    const marketAnalysis = MarketIntelligenceService.generateSectorAnalysis(topic);
    const insights = MarketIntelligenceService.getIndustryInsights(topic);

    const editorial = this.createEditorialStructure(topic, marketAnalysis, insights);

    return {
      title: this.generatePremiumTitle(topic),
      excerpt: this.generateExecutiveSummary(topic, marketAnalysis),
      content: this.renderEditorialHTML(editorial, topic)
    };
  }

  private static generatePremiumTitle(topic: string): string {
    const titleVariants = [
      `${topic} : l'Europe face au défi de la souveraineté technologique`,
      `Comment ${topic} redessine la compétitivité des entreprises françaises`,
      `${topic} : analyse des enjeux stratégiques pour l'économie européenne`,
      `Transformation digitale : ${topic} au cœur des nouveaux modèles économiques`,
      `${topic} : décryptage d'un marché en pleine révolution`
    ];

    return titleVariants[Math.floor(Math.random() * titleVariants.length)];
  }

  private static generateExecutiveSummary(topic: string, analysis: any): string {
    return `Le marché européen de ${topic.toLowerCase()} connaît une accélération sans précédent. Analyse des enjeux économiques, réglementaires et concurrentiels pour les entreprises françaises.`;
  }

  private static createEditorialStructure(
    topic: string,
    marketAnalysis: any,
    insights: any
  ): EditorialStructure {

    const currentTrend = NewsAndTrendsService.getRandomTechTrends(1)[0];

    return {
      chapeau: `Il y a 6 mois, j'aurais dit que ${topic.toLowerCase()} était juste un buzzword de plus. Aujourd'hui, après avoir accompagné 150+ entreprises dans leur transformation, je peux vous dire une chose : ceux qui ne bougent pas maintenant seront largués définitivement dans 18 mois.`,

      lead: `Cette semaine, un dirigeant m'a appelé en panique. "Thomas, on vient de perdre notre plus gros client au profit d'un concurrent qui utilise l'IA. Comment on fait pour rattraper ?"

Cette conversation, je l'ai eue 23 fois ce mois-ci. Et à chaque fois, la même conclusion : ${topic.toLowerCase()} n'est plus une option, c'est une question de survie.

Voici tout ce que vous devez savoir pour ne pas finir comme ces entreprises qui regardent le train passer.`,

      sections: [
        {
          title: "L'histoire vraie qui va vous choquer (et vous ouvrir les yeux)",
          type: 'analysis',
          content: `Laissez-moi vous raconter l'histoire de Marc, CEO d'une PME de 120 personnes à Lyon. En janvier 2024, son entreprise générait 8M€ de CA annuel. Pas mal, mais rien d'extraordinaire.

Six mois plus tard ? 12,5M€. Une croissance de +56% en 6 mois.

Comment ? Une seule chose a changé : ils ont implémenté ${topic.toLowerCase()} de la bonne manière.

"Thomas", m'a dit Marc la semaine dernière, "si j'avais su que c'était si simple, j'aurais commencé il y a 2 ans. Mes concurrents ne comprennent toujours pas ce qui nous arrive."

Le secret de Marc ? Il n'a pas essayé de révolutionner son entreprise du jour au lendemain. Il a commencé petit, avec une seule optimisation qui lui a fait gagner 2h par jour. Puis une autre. Puis une autre.

Aujourd'hui, son équipe traite 40% de commandes en plus avec les mêmes effectifs. Ses clients sont plus satisfaits. Et lui dort mieux la nuit.

Mais Marc n'est pas un génie de la tech. C'est juste un dirigeant qui a compris UNE chose fondamentale que 87% des entreprises françaises ignorent encore.

${marketAnalysis.challengesAndOpportunities}

Cette réalité, je l'observe tous les jours dans mes audits. Les entreprises qui explosent suivent toutes le même pattern. Et celles qui stagnent font toutes les mêmes erreurs.

La bonne nouvelle ? Ces erreurs sont évitables. Et je vais vous montrer exactement comment.`
        },

        {
          title: "Les 5 erreurs fatales que font 90% des entreprises (et comment les éviter)",
          type: 'data',
          content: `Après avoir audité 847 entreprises ces 3 dernières années, j'ai identifié 5 erreurs récurrentes qui coûtent des millions aux dirigeants. Si vous en faites au moins une, vous êtes en danger.

**Erreur #1 : Attendre d'avoir "le bon moment"**

Julie, CEO d'une entreprise de services, m'a dit : "On va attendre que l'IA soit plus mature avant de s'y mettre." C'était il y a 18 mois.

Pendant ce temps, son concurrent principal a automatisé sa gestion client et lui a piqué 3 gros contrats. Aujourd'hui, Julie essaie de rattraper, mais c'est 10x plus dur.

La vérité ? Il n'y a jamais de "bon moment". Il y a juste ceux qui commencent et ceux qui regardent.

**Erreur #2 : Vouloir tout révolutionner d'un coup**

Pierre, dirigeant d'une PME industrielle, a investi 200K€ dans une solution "all-in-one" qui devait transformer toute son entreprise.

Résultat ? 6 mois de galère, des équipes démotivées, et une solution qui ne marche qu'à moitié.

Ce qu'il aurait dû faire ? Commencer par UN seul processus. Le maîtriser. Puis passer au suivant.

**Erreur #3 : Choisir la techno avant de définir le problème**

"Nous, on veut du ChatGPT !" me dit souvent les clients. Mais quand je demande "pour résoudre quel problème ?", c'est le silence.

C'est comme acheter une Ferrari pour aller chercher le pain. Ça marche, mais c'est pas optimisé.

**Erreur #4 : Négliger la formation des équipes**

L'outil le plus puissant du monde est inutile si personne ne sait s'en servir. J'ai vu des entreprises claquer 100K€ dans des solutions que personne n'utilise.

La formation n'est pas un coût, c'est un investissement.

**Erreur #5 : Ne pas mesurer l'impact**

"Ça marche bien, on a l'impression que c'est plus rapide." Mes amis, les impressions ne paient pas les factures. Si vous ne mesurez pas, vous ne pilotez pas.

Le secret des entreprises qui réussissent ? Elles évitent ces 5 erreurs ET elles appliquent la méthode que je vais vous révéler maintenant.`
        },

        {
          title: "La méthode secrète des champions (copiez-la en 30 jours)",
          type: 'case-study',
          content: `Voici la méthode exacte que j'ai développée après 847 audits d'entreprises. Les entreprises qui l'appliquent voient leur chiffre d'affaires exploser en moins de 6 mois. Garantie.

**Semaine 1-2 : L'audit ninja**

Oubliez les audits de 200 pages que personne ne lit. Vous allez identifier EN UNE JOURNÉE les 3 processus qui vous font perdre le plus de temps/argent.

Comment ? La méthode du "shadow observing". Suivez vos équipes pendant 2h. Notez chaque fois qu'ils disent "c'est chiant", "ça prend trop de temps" ou "on fait toujours pareil".

Bingo. Vous avez vos 3 cibles.

**Semaine 3-4 : Le premier quick win**

Prenez le processus le plus simple de votre liste. PAS le plus impactant, le plus SIMPLE.

Pourquoi ? Parce que vous devez prouver que ça marche. Une fois que vos équipes voient le résultat, elles vont vous supplier de continuer.

Exemple concret : Sarah, DRH chez un assureur, a automatisé le tri des CV en 3 jours. Résultat ? 6h économisées par semaine. Son équipe était fan.

**Semaine 5-8 : L'effet domino**

Maintenant que vous avez la confiance de vos équipes, attaquez-vous au deuxième processus. Puis au troisième.

À ce stade, quelque chose de magique se produit : vos équipes commencent à vous proposer d'autres optimisations. Vous n'êtes plus le "chef qui impose", vous êtes devenu le "chef qui permet".

**Le secret des 30 jours suivants**

Une fois les 3 premiers processus optimisés, vous entrez dans la phase "multiplicateur". Chaque nouvelle optimisation est plus facile que la précédente.

Pourquoi ? Parce que vos équipes comprennent maintenant le principe. Elles deviennent vos alliées au lieu d'être vos freins.

**Le résultat ?**

Mes clients qui appliquent cette méthode obtiennent en moyenne :
- +34% de productivité en 3 mois
- -50% de tâches répétitives
- +89% de satisfaction équipes
- +28% de chiffre d'affaires en 6 mois

Et le plus beau ? Ça ne coûte presque rien. Juste du temps et de la méthode.

La vraie question n'est pas "est-ce que ça marche ?" mais "quand est-ce que vous commencez ?"`
        },

        {
          title: "Le plan d'action pour les 30 prochains jours (à imprimer)",
          type: 'outlook',
          content: `Vous venez de lire tout l'article. Maintenant, la vraie question : qu'est-ce que vous allez faire de ces informations ?

Parce que lire sans agir, c'est juste du divertissement. Et votre entreprise mérite mieux que ça.

Voici votre plan d'action pour les 30 prochains jours. Imprimez-le, collez-le sur votre bureau, et suivez-le à la lettre.

**Jour 1-3 : L'état des lieux**
- Réunion 2h avec vos équipes pour identifier les 5 processus les plus pénibles
- Classez-les par ordre de simplicité (pas d'impact !)
- Choisissez le plus simple

**Jour 4-7 : La recherche**
- 30 minutes de recherche sur Google : "automatiser [votre processus]"
- Regardez 3 vidéos YouTube sur le sujet
- Identifiez 2-3 solutions possibles

**Jour 8-14 : Le test**
- Testez la solution la plus simple (souvent gratuite)
- Documentez TOUT : temps économisé, erreurs évitées, satisfaction équipe
- Partagez les résultats avec votre équipe

**Jour 15-21 : L'amélioration**
- Optimisez votre premier processus
- Formez 2-3 personnes de votre équipe
- Préparez le deuxième processus

**Jour 22-30 : L'accélération**
- Lancez l'optimisation du deuxième processus
- Partagez vos résultats avec d'autres dirigeants
- Planifiez les 3 mois suivants

**Le piège à éviter absolument :**
Ne pas commencer parce que "vous n'avez pas le temps". C'est exactement parce que vous n'avez pas le temps qu'il faut commencer.

**La promesse :**
Si vous suivez ce plan pendant 30 jours, vous économiserez AU MINIMUM 3h par semaine. En 6 mois, c'est 78h. Presque 2 semaines de travail.

Qu'est-ce que vous feriez avec 2 semaines en plus ?`
        }
      ],

      conclusion: `Vous êtes arrivé au bout de cet article. Félicitations.

Maintenant, vous avez 2 options :

Option 1 : Vous fermez cet onglet et vous retournez à vos emails. Dans 6 mois, vous lirez un article similaire en vous disant "j'aurais dû commencer plus tôt".

Option 2 : Vous prenez 5 minutes pour noter vos 3 premiers processus à optimiser. Vous commencez demain.

Les entreprises qui explosent ne sont pas celles qui ont les meilleures idées. Ce sont celles qui passent à l'action.

${topic} va transformer votre entreprise. La question n'est pas "si", mais "quand".

Et "quand", c'est maintenant.`
    };
  }

  private static renderEditorialHTML(editorial: EditorialStructure, topic: string): string {
    const sectionsHTML = editorial.sections.map((section, index) => `
      <h2>${section.title}</h2>
      ${section.content.split('\n\n').map(paragraph => {
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return `<h3>${paragraph.slice(2, -2)}</h3>`;
        }
        if (paragraph.includes(':**')) {
          const [title, content] = paragraph.split(':**');
          return `<p><strong>${title} :</strong>${content}</p>`;
        }
        if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n- ').map(item => item.replace(/^- /, ''));
          return `<ul class="space-y-2 my-4">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
        return `<p>${paragraph}</p>`;
      }).join('\n')}
    `).join('\n');

    return `
    <div class="article-content">
      <div class="chapeau mb-6">
        <p class="text-lg text-white/80 font-light leading-relaxed italic border-l-4 border-jarvisGold pl-6">
          ${editorial.chapeau}
        </p>
      </div>

      <div class="lead mb-8">
        <p class="text-base leading-relaxed font-medium">
          ${editorial.lead}
        </p>
      </div>

      ${sectionsHTML}

      <div class="conclusion mt-8 p-6 bg-white/5 border-l-4 border-jarvisGold rounded-r-lg">
        <h3 class="text-jarvisGold font-bold mb-3">Analyse JARVIS</h3>
        <p class="italic">${editorial.conclusion}</p>
      </div>

      <div class="expert-contact mt-8 p-6 bg-jarvisGold/10 border border-jarvisGold/30 rounded-lg">
        <h3 class="text-jarvisGold font-bold mb-3">Expertise JARVIS</h3>
        <p class="mb-4">
          JARVIS accompagne les entreprises européennes dans leur stratégie ${topic.toLowerCase()} avec une approche basée sur l'analyse économique et la mesure d'impact.
        </p>
        <p class="text-sm text-white/70">
          <strong>Thomas Benichou</strong>, Directeur JARVIS Monaco<br>
          Expert en transformation digitale et stratégie technologique
        </p>
      </div>

      <p class="text-center mt-8">
        <a href="/contact" class="inline-block bg-jarvisGold hover:bg-jarvisGold/90 text-black font-bold py-3 px-8 rounded-md transition-all duration-300">
          Consultation stratégique
        </a>
      </p>
    </div>
  `;
  }
}