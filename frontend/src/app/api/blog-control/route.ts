import { NextRequest, NextResponse } from 'next/server';
import { startBlogAutomation, stopBlogAutomation, generateArticleNow, getBlogSchedulerStatus } from '@/lib/blog-scheduler';
import { loadPublishedArticles, loadStats } from '@/lib/blog-storage';

export async function GET() {
  try {
    const status = getBlogSchedulerStatus();
    const articles = loadPublishedArticles();
    const stats = loadStats();

    return NextResponse.json({
      success: true,
      scheduler: status,
      articles: {
        total: articles.length,
        recent: articles.slice(0, 5).map(article => ({
          title: article.title,
          slug: article.slug,
          category: article.category,
          publishedAt: article.publishedAt,
          views: article.views || 0
        }))
      },
      stats
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération du statut'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    switch (action) {
      case 'start':
        startBlogAutomation();
        return NextResponse.json({
          success: true,
          message: 'Automatisation du blog démarrée',
          status: getBlogSchedulerStatus()
        });

      case 'stop':
        stopBlogAutomation();
        return NextResponse.json({
          success: true,
          message: 'Automatisation du blog arrêtée',
          status: getBlogSchedulerStatus()
        });

      case 'generate':
        const result = await generateArticleNow();
        return NextResponse.json({
          success: result.success,
          message: result.success
            ? 'Article généré avec succès'
            : 'Erreur lors de la génération',
          result
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Action non reconnue. Actions disponibles: start, stop, generate'
        }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'exécution de l\'action'
    }, { status: 500 });
  }
}