import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 🔗 WEBHOOK N8N - Réception de contenu de blog automatisée
// Endpoint sécurisé pour recevoir du contenu généré par N8N

interface N8NArticlePayload {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  keywords: string[];
  author?: string;
  slug?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // 🔐 Vérification token de sécurité
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.N8N_WEBHOOK_SECRET || 'jarvis-n8n-webhook-2024';

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({
        success: false,
        error: 'Token d\'autorisation invalide'
      }, { status: 401 });
    }

    const payload: N8NArticlePayload = await request.json();

    // 📋 Validation des données requises
    const requiredFields = ['title', 'content', 'excerpt', 'category'];
    const missingFields = requiredFields.filter(field => !payload[field]);

    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Champs manquants: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // 🏷️ Génération du slug automatique
    const slug = payload.slug || generateSlug(payload.title);

    // 📝 Construction de l'article
    const article = {
      slug,
      title: payload.title,
      excerpt: payload.excerpt,
      content: payload.content,
      category: payload.category,
      keywords: payload.keywords || [],
      seo: {
        title: payload.seo?.title || `${payload.title} | JARVIS Monaco`,
        description: payload.seo?.description || payload.excerpt,
        keywords: payload.seo?.keywords || payload.keywords?.join(', ') || '',
        canonicalUrl: `https://jarvis-mc.com/blog/${slug}`,
        ogTitle: payload.seo?.title || payload.title,
        ogDescription: payload.seo?.description || payload.excerpt,
        ogImage: '/images/jarvis-editorial-premium.jpg',
        twitterCard: 'summary_large_image',
        twitterTitle: payload.seo?.title || payload.title,
        twitterDescription: payload.seo?.description || payload.excerpt,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: payload.title,
          author: {
            '@type': 'Person',
            name: payload.author || 'Thomas Benichou',
            jobTitle: 'Directeur JARVIS Monaco',
            worksFor: {
              '@type': 'Organization',
              name: 'JARVIS'
            }
          },
          publisher: {
            '@type': 'Organization',
            name: 'JARVIS',
            logo: {
              '@type': 'ImageObject',
              url: 'https://jarvis-mc.com/logo.png'
            }
          },
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://jarvis-mc.com/blog/${slug}`
          },
          articleSection: payload.category,
          keywords: payload.keywords,
          about: {
            '@type': 'Thing',
            name: payload.title
          },
          audience: {
            '@type': 'Audience',
            audienceType: 'business professionals, decision makers, tech leaders'
          }
        }
      },
      createdAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      author: payload.author || 'Thomas Benichou',
      readTime: calculateReadTime(payload.content),
      trending: false,
      views: 0,
      status: 'published'
    };

    // 💾 Sauvegarde dans le fichier JSON
    await saveArticleToFile(article);

    console.log(`✅ Article N8N publié: "${article.title}" (${article.slug})`);

    return NextResponse.json({
      success: true,
      message: 'Article publié avec succès',
      article: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        category: article.category,
        readTime: article.readTime,
        publishedAt: article.publishedAt,
        url: `https://jarvis-mc.com/blog/${article.slug}`
      },
      metadata: {
        wordCount: countWords(payload.content),
        keywords: article.keywords,
        seoScore: calculateSEOScore(article)
      }
    });

  } catch (error) {
    console.error('🚨 Erreur webhook N8N:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// 🔧 Fonctions utilitaires

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Garde seulement lettres, chiffres, espaces et tirets
    .replace(/\s+/g, '-') // Remplace espaces par tirets
    .replace(/-+/g, '-') // Évite les tirets multiples
    .slice(0, 50) // Limite la longueur
    .replace(/^-|-$/g, ''); // Supprime tirets début/fin
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = countWords(content);
  return Math.ceil(wordCount / wordsPerMinute);
}

function countWords(content: string): number {
  // Supprime le HTML et compte les mots
  const textContent = content.replace(/<[^>]*>/g, '');
  return textContent.split(/\s+/).filter(word => word.length > 0).length;
}

function calculateSEOScore(article: any): number {
  let score = 0;

  // Titre (0-25 points)
  if (article.title.length >= 30 && article.title.length <= 60) score += 25;
  else if (article.title.length >= 20) score += 15;

  // Description (0-25 points)
  if (article.seo.description.length >= 120 && article.seo.description.length <= 160) score += 25;
  else if (article.seo.description.length >= 80) score += 15;

  // Mots-clés (0-20 points)
  if (article.keywords.length >= 3) score += 20;
  else if (article.keywords.length >= 1) score += 10;

  // Contenu (0-30 points)
  const wordCount = countWords(article.content);
  if (wordCount >= 800) score += 30;
  else if (wordCount >= 500) score += 20;
  else if (wordCount >= 300) score += 10;

  return score;
}

async function saveArticleToFile(article: any): Promise<void> {
  const articlesPath = path.join(process.cwd(), 'src/data/blog/articles.json');

  try {
    // Lit le fichier existant
    let articles = [];
    if (fs.existsSync(articlesPath)) {
      const fileContent = fs.readFileSync(articlesPath, 'utf8');
      articles = JSON.parse(fileContent);
    }

    // Vérifie si l'article existe déjà (par slug)
    const existingIndex = articles.findIndex((a: any) => a.slug === article.slug);

    if (existingIndex >= 0) {
      // Met à jour l'article existant
      articles[existingIndex] = { ...articles[existingIndex], ...article };
    } else {
      // Ajoute le nouvel article au début
      articles.unshift(article);
    }

    // Sauvegarde
    fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));

  } catch (error) {
    console.error('Erreur sauvegarde article:', error);
    throw new Error('Impossible de sauvegarder l\'article');
  }
}

// 📊 GET : Status de l'endpoint N8N
export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/n8n-webhook',
    method: 'POST',
    authentication: 'Bearer token required',
    timestamp: new Date().toISOString(),
    documentation: {
      required_headers: {
        'Authorization': 'Bearer YOUR_SECRET_TOKEN',
        'Content-Type': 'application/json'
      },
      required_fields: ['title', 'content', 'excerpt', 'category'],
      optional_fields: ['keywords', 'author', 'slug', 'seo'],
      example_payload: {
        title: 'Innovation IA en France 2024',
        content: '<p>Contenu de l\'article...</p>',
        excerpt: 'Résumé de l\'article',
        category: 'Innovation',
        keywords: ['IA', 'France', 'innovation'],
        author: 'Thomas Benichou'
      }
    }
  });
}