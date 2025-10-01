import { NextRequest, NextResponse } from 'next/server';
import { EditorialIntelligenceService } from '@/lib/editorial-intelligence';
import { NaturalContentGenerator } from '@/lib/natural-content-generator';
import { SmartEditorialSelector } from '@/lib/smart-editorial-selector';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const forcedTopic = requestData.topic;
    const forcedCategory = requestData.category;
    const customKeywords = requestData.keywords || [];

    // 🎯 INTELLIGENCE ÉDITORIALE CHIRURGICALE 2.0
    // Sélection basée sur Actualité + SEO + Tendances
    let editorialOpportunity;
    let smartRecommendation = null;

    if (forcedTopic) {
      editorialOpportunity = {
        topic: forcedTopic,
        uniqueAngle: `Analyse JARVIS exclusive sur ${forcedTopic}`,
        timeWindow: 7,
        businessValue: 75,
        jarvisExpertise: 85,
        seoOpportunity: 70,
        socialSharing: 65
      };
    } else {
      // 🔥 NOUVEAU : Sélection intelligente multi-facteurs
      smartRecommendation = SmartEditorialSelector.selectOptimalTopic();

      editorialOpportunity = {
        topic: smartRecommendation.topic,
        uniqueAngle: smartRecommendation.angle,
        timeWindow: smartRecommendation.urgency === 'critical' ? 1 :
                   smartRecommendation.urgency === 'high' ? 3 : 7,
        businessValue: smartRecommendation.businessValue,
        jarvisExpertise: 85,
        seoOpportunity: smartRecommendation.seoScore,
        socialSharing: smartRecommendation.actualityScore
      };
    }

    console.log('🎯 Sujet sélectionné par IA éditoriale:', editorialOpportunity.topic);
    console.log('📊 Score opportunité:', {
      businessValue: editorialOpportunity.businessValue,
      jarvisExpertise: editorialOpportunity.jarvisExpertise,
      timeWindow: editorialOpportunity.timeWindow
    });

    // 📝 GÉNÉRATION CONTENU NATUREL (NOUVEAU SYSTÈME)
    const naturalArticle = NaturalContentGenerator.generateNaturalArticle(
      editorialOpportunity.topic,
      1800 // Longueur cible
    );

    // 📊 BRIEF ÉDITORIAL POUR TRAÇABILITÉ
    const editorialBrief = EditorialIntelligenceService.generateEditorialBrief(editorialOpportunity);

    console.log('✅ Article naturel généré:', {
      title: naturalArticle.title,
      style: naturalArticle.style,
      sources: naturalArticle.sources.length
    });

    // 🔍 SEO METADATA PREMIUM
    const seoMetadata = generatePremiumSEOMetadata(
      editorialOpportunity.topic,
      forcedCategory || determineCategory(editorialOpportunity.topic),
      customKeywords
    );

    // 📝 ARTICLE FINAL NATUREL
    const slug = createSlug(naturalArticle.title);
    const article = {
      slug,
      title: naturalArticle.title,
      excerpt: naturalArticle.excerpt,
      content: naturalArticle.content,
      category: forcedCategory || determineCategory(editorialOpportunity.topic),
      keywords: customKeywords.length ? customKeywords : extractKeywords(editorialOpportunity.topic),
      seo: seoMetadata,
      createdAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      author: "Thomas Benichou",
      readTime: calculateReadTime(naturalArticle.content),
      trending: editorialOpportunity.businessValue > 70,
      // 🎯 MÉTADONNÉES INTELLIGENCE ÉDITORIALE
      editorialIntelligence: {
        opportunity: editorialOpportunity,
        brief: editorialBrief,
        competitiveAdvantage: editorialBrief.competitiveAdvantage,
        timeline: editorialBrief.timeline,
        sources: editorialBrief.sources,
        // 🔥 NOUVEAU : Métadonnées sélection intelligente
        smartSelection: smartRecommendation ? {
          priority: smartRecommendation.priority,
          actualityScore: smartRecommendation.actualityScore,
          seoScore: smartRecommendation.seoScore,
          trendScore: smartRecommendation.trendScore,
          urgency: smartRecommendation.urgency,
          timing: smartRecommendation.timing,
          reasoning: smartRecommendation.reasoning,
          estimatedTraffic: smartRecommendation.estimatedTraffic
        } : null
      },
      views: 0,
      status: 'published'
    };

    // 💾 SAUVEGARDE CONDITIONNELLE (seulement si demandée)
    let saved = false;
    if (requestData.saveToSite === true) {
      try {
        const articlesPath = path.join(process.cwd(), 'src/data/blog/articles.json');
        let existingArticles = [];

        try {
          const articlesData = await fs.readFile(articlesPath, 'utf-8');
          existingArticles = JSON.parse(articlesData);
        } catch (readError) {
          console.log('📝 Création nouveau fichier articles.json');
          existingArticles = [];
        }

        // Vérifier si l'article existe déjà (éviter doublons)
        const existingSlug = existingArticles.find(a => a.slug === article.slug);
        if (!existingSlug) {
          // Ajouter le nouvel article en première position
          existingArticles.unshift(article);

          // Limiter à 10 articles maximum
          if (existingArticles.length > 10) {
            existingArticles = existingArticles.slice(0, 10);
          }

          // Sauvegarder
          await fs.writeFile(articlesPath, JSON.stringify(existingArticles, null, 2));

          console.log(`✅ Article sauvegardé sur le site : "${article.title}"`);
          saved = true;
        } else {
          console.log(`⚠️ Article existant ignoré : "${article.title}"`);
        }
      } catch (saveError) {
        console.error('🚨 Erreur sauvegarde article:', saveError);
      }
    }

    return NextResponse.json({
      success: true,
      article,
      saved, // Indique si l'article a été sauvegardé
      editorialBrief: {
        selectedTopic: editorialOpportunity.topic,
        uniqueAngle: editorialOpportunity.uniqueAngle,
        competitiveAdvantage: editorialBrief.competitiveAdvantage,
        timeWindow: `${editorialOpportunity.timeWindow} jours d'avance concurrentielle`,
        sources: editorialBrief.sources.slice(0, 3)
      },
      wordCount: naturalArticle.content.split(' ').length,
      generatedAt: new Date().toISOString(),
      system: 'JARVIS Editorial Intelligence v2.0'
    });

  } catch (error) {
    console.error('🚨 Erreur système intelligence éditoriale:', error);

    // 🔄 FALLBACK PREMIUM
    const fallbackOpportunity = {
      topic: 'Intelligence Artificielle Entreprise',
      uniqueAngle: 'Transformation digitale et IA : guide pratique pour dirigeants',
      timeWindow: 14,
      businessValue: 70,
      jarvisExpertise: 90,
      seoOpportunity: 80,
      socialSharing: 60
    };

    const fallbackArticle = NaturalContentGenerator.generateNaturalArticle(
      fallbackOpportunity.topic,
      1600
    );

    const fallbackSlug = createSlug(fallbackArticle.title);

    return NextResponse.json({
      success: true,
      article: {
        slug: fallbackSlug,
        title: fallbackArticle.title,
        excerpt: fallbackArticle.excerpt,
        content: fallbackArticle.content,
        category: 'Tech Business',
        keywords: ['intelligence artificielle', 'entreprise', 'transformation digitale'],
        readTime: calculateReadTime(fallbackArticle.content),
        createdAt: new Date().toISOString(),
        status: 'published',
        views: 0,
        author: 'Thomas Benichou'
      },
      fallbackUsed: true,
      wordCount: fallbackArticle.content.split(' ').length,
      generatedAt: new Date().toISOString(),
      error: 'Fallback premium activé - Qualité garantie',
      system: 'JARVIS Editorial Intelligence v2.0 (Fallback)'
    });
  }
}

// 🇑ÉTERMINER CATÉGORIE INTELLIGENTE
function determineCategory(topic: string): string {
  const categoryMappings = {
    'ia': 'Tech Business',
    'intelligence artificielle': 'Tech Business',
    'quantum': 'Innovation',
    'no-code': 'Développement',
    'fintech': 'Finance Tech',
    'conformité': 'Réglementaire',
    'audit': 'Audit IA',
    'monaco': 'Écosystème'
  };

  const normalized = topic.toLowerCase();
  for (const [key, category] of Object.entries(categoryMappings)) {
    if (normalized.includes(key)) {
      return category;
    }
  }
  return 'Tech Business';
}

// 🔑 EXTRACTION MOTS-CLÉS INTELLIGENTE
function extractKeywords(topic: string): string[] {
  const baseKeywords = ['intelligence artificielle', 'entreprise', 'innovation'];

  const specificKeywords: Record<string, string[]> = {
    'quantum': ['informatique quantique', 'technologies émergentes', 'recherche appliquée'],
    'ia': ['machine learning', 'automatisation', 'transformation digitale'],
    'fintech': ['finance numérique', 'régtech', 'compliance'],
    'monaco': ['écosystème tech', 'hub innovation', 'souveraineté technologique']
  };

  const normalized = topic.toLowerCase();
  for (const [key, keywords] of Object.entries(specificKeywords)) {
    if (normalized.includes(key)) {
      return [...keywords, ...baseKeywords.slice(0, 2)];
    }
  }

  return baseKeywords;
}

// 🔍 SEO PREMIUM AVEC INTELLIGENCE ÉDITORIALE
function generatePremiumSEOMetadata(topic: string, category: string, keywords: string[]) {
  const seoTitle = `${topic} : Analyse Exclusive JARVIS 2024`;
  const seoDescription = `Analyse experte ${topic} par JARVIS Monaco. Intelligence économique, tendances marché et stratégies différenciantes pour dirigeants.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.join(', '),
    canonicalUrl: `https://jarvis-mc.com/blog/${createSlug(topic)}`,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
    ogImage: '/images/jarvis-editorial-premium.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: seoTitle,
    twitterDescription: seoDescription,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": seoTitle,
      "author": {
        "@type": "Person",
        "name": "Thomas Benichou",
        "jobTitle": "Directeur JARVIS Monaco",
        "worksFor": {
          "@type": "Organization",
          "name": "JARVIS"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "JARVIS",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jarvis-mc.com/logo.png"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://jarvis-mc.com/blog/${createSlug(topic)}`
      },
      "articleSection": category,
      "keywords": keywords,
      "about": {
        "@type": "Thing",
        "name": topic
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "business professionals, decision makers, tech leaders"
      }
    }
  };
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[àáâäæãåāăą]/g, 'a')
    .replace(/[çćčĉċ]/g, 'c')
    .replace(/[èéêëēėęěĕ]/g, 'e')
    .replace(/[ìíîïīįìĩĭ]/g, 'i')
    .replace(/[òóôöőõøōŏ]/g, 'o')
    .replace(/[ùúûüūůűũŭ]/g, 'u')
    .replace(/[ñń]/g, 'n')
    .replace(/[ß]/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

function calculateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(' ').length;
  return Math.ceil(words / 200); // 200 mots par minute en moyenne
}

// 📊 CALENDRIER ÉDITORIAL POUR SUIVI
export async function GET() {
  try {
    // 📅 Récupérer le calendrier éditorial de la semaine
    const editorialCalendar = EditorialIntelligenceService.getEditorialCalendar();

    return NextResponse.json({
      success: true,
      calendar: editorialCalendar.map(opportunity => ({
        topic: opportunity.topic,
        uniqueAngle: opportunity.uniqueAngle,
        businessValue: opportunity.businessValue,
        timeWindow: opportunity.timeWindow,
        jarvisExpertise: opportunity.jarvisExpertise,
        priority: opportunity.businessValue + opportunity.jarvisExpertise
      })),
      week: `Semaine du ${new Date().toLocaleDateString('fr-FR')}`,
      system: 'JARVIS Editorial Intelligence v2.0'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erreur récupération calendrier éditorial',
      fallback: 'Système de sélection premium indisponible'
    }, { status: 500 });
  }
}



