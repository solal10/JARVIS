import { NextResponse } from 'next/server';
import { saveArticle, generateUniqueSlug, loadAllArticles } from '@/lib/blog-storage';

export async function POST() {
  try {
    console.log('🤖 Démarrage de la génération automatique de blog...');

    // 1. Analyser les tendances
    console.log('📊 Analyse des tendances...');
    const trendsResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/trends`);

    if (!trendsResponse.ok) {
      throw new Error('Erreur lors de l\'analyse des tendances');
    }

    const trendsData = await trendsResponse.json();

    if (!trendsData.success || trendsData.articleIdeas.length === 0) {
      console.log('⚠️ Aucune tendance détectée, utilisation des sujets de fallback');
      const fallbackTopics = [
        {
          topic: "Intelligence Artificielle Générative en Entreprise 2024",
          category: "Audit IA",
          keywords: ["IA générative", "ChatGPT entreprise", "automatisation", "productivité", "2024"],
          priority: 40
        },
        {
          topic: "Next.js 15 : Nouvelles Fonctionnalités et Performance",
          category: "Développement",
          keywords: ["Next.js 15", "React", "performance", "développement web", "2024"],
          priority: 35
        }
      ];

      // Utiliser un sujet de fallback
      const selectedTopic = fallbackTopics[Math.floor(Math.random() * fallbackTopics.length)];
      return await generateAndSaveArticle(selectedTopic);
    }

    // 2. Sélectionner le meilleur sujet basé sur la priorité
    const bestTopics = trendsData.articleIdeas
      .sort((a: any, b: any) => b.priority - a.priority)
      .slice(0, 3); // Prendre les 3 meilleurs sujets

    console.log(`🎯 ${bestTopics.length} sujets prioritaires trouvés`);

    // Vérifier qu'on n'a pas déjà traité ces sujets récemment
    const existingArticles = loadAllArticles();
    const recentSlugs = existingArticles
      .filter(article => {
        const daysDiff = (Date.now() - new Date(article.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff < 7; // Articles des 7 derniers jours
      })
      .map(article => article.slug);

    const availableTopics = bestTopics.filter((topic: any) => {
      const slug = generateUniqueSlug(topic.suggestedTitle || topic.topic);
      return !recentSlugs.includes(slug);
    });

    if (availableTopics.length === 0) {
      console.log('⚠️ Tous les sujets tendances ont été récemment traités');
      return NextResponse.json({
        success: false,
        message: 'Tous les sujets tendances ont été récemment traités',
        nextRun: 'Prochaine exécution dans quelques heures'
      });
    }

    // 3. Générer et sauvegarder l'article pour le meilleur sujet disponible
    const selectedTopic = availableTopics[0];
    return await generateAndSaveArticle(selectedTopic);

  } catch (error) {
    console.error('❌ Erreur lors de la génération automatique:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la génération automatique du blog',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

async function generateAndSaveArticle(topicData: any) {
  try {
    console.log(`✍️ Génération de l'article : "${topicData.topic}"`);

    // Générer l'article avec IA
    const articleResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/generate-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topicData.topic || topicData.suggestedTitle,
        category: topicData.category,
        keywords: topicData.keywords || [topicData.topic],
        priority: topicData.priority || 25
      }),
    });

    if (!articleResponse.ok) {
      throw new Error('Erreur lors de la génération de l\'article');
    }

    const articleData = await articleResponse.json();

    if (!articleData.success) {
      // Utiliser le fallback si disponible
      if (articleData.fallbackArticle) {
        console.log('⚠️ Utilisation de l\'article de fallback');
        const fallbackArticle = {
          ...articleData.fallbackArticle,
          slug: generateUniqueSlug(articleData.fallbackArticle.title),
          status: 'published' as const,
          views: 0,
          trending: topicData.priority > 30
        };

        const saved = saveArticle(fallbackArticle);

        return NextResponse.json({
          success: saved,
          message: saved ? 'Article généré et sauvegardé avec fallback' : 'Erreur lors de la sauvegarde',
          article: saved ? fallbackArticle : null,
          usedFallback: true
        });
      }

      throw new Error('Échec de la génération d\'article et aucun fallback disponible');
    }

    // Sauvegarder l'article généré
    const article = {
      ...articleData.article,
      slug: generateUniqueSlug(articleData.article.title),
      status: 'published' as const,
      views: 0
    };

    console.log(`💾 Sauvegarde de l'article : "${article.title}"`);
    const saved = saveArticle(article);

    if (!saved) {
      throw new Error('Erreur lors de la sauvegarde de l\'article');
    }

    console.log('✅ Article généré et publié avec succès !');

    return NextResponse.json({
      success: true,
      message: 'Article généré et publié avec succès',
      article: {
        title: article.title,
        slug: article.slug,
        category: article.category,
        readTime: article.readTime,
        trending: article.trending
      },
      stats: {
        wordCount: articleData.wordCount,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors de la génération et sauvegarde:', error);
    throw error;
  }
}

// GET pour déclencher manuellement la génération (pour les tests)
export async function GET() {
  return await POST();
}