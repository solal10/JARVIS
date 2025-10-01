import React from 'react';
import Link from 'next/link';
import PixelWave from '@/components/PixelWave';
import Breadcrumbs from '@/components/Breadcrumbs';
import { blogSchema } from './schema';
import { loadPublishedArticles, incrementArticleViews } from '@/lib/blog-storage';

export const metadata = {
  title: "Blog Expert IA & Développement | Actualités Tech Entreprises | JARVIS",
  description: "Blog expert JARVIS : actualités intelligence artificielle, développement web, conseils tech pour entreprises. Articles optimisés SEO sur les dernières tendances IT.",
};

// Interface pour les articles (mise à jour avec le nouveau système)
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readTime: number;
  trending?: boolean;
  views?: number;
}

// Fonction pour charger les articles depuis le système de stockage
function getBlogPosts(): BlogPost[] {
  try {
    const articles = loadPublishedArticles();
    return articles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map(article => ({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        publishedAt: article.publishedAt,
        category: article.category,
        readTime: article.readTime,
        trending: article.trending,
        views: article.views || 0
      }));
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error);
    // Articles de fallback en cas d'erreur
    return [
      {
        slug: "audit-ia-entreprise-2024-guide-complet",
        title: "Audit IA Entreprise 2024 : Guide Complet pour Réussir sa Transformation",
        excerpt: "Découvrez comment mener un audit IA efficace dans votre entreprise. Méthodologie, outils et bonnes pratiques pour une transformation réussie.",
        publishedAt: "2024-01-15T09:00:00.000Z",
        category: "Audit IA",
        readTime: 8,
        trending: true,
        views: 0
      }
    ];
  }
}

export default function BlogPage() {
  // Charger les articles depuis le système de stockage
  const blogPosts = getBlogPosts();
  return (
    <>
      {/* Schema.org JSON-LD pour le blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="relative min-h-screen">
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

        <div className="relative z-10">
          <section className="py-24 px-6 bg-transparent text-white">
            <div className="max-w-screen-lg mx-auto">
              {/* Hero Section */}
              <div className="w-full pt-24 pb-16 px-6 text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">Blog Expert IA & Tech</h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/80">Actualités Intelligence Artificielle & Développement</h2>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                  Découvrez les dernières tendances en intelligence artificielle, développement web et tech business.
                  Articles d'experts mis à jour automatiquement selon les sujets les plus recherchés.
                </p>
              </div>

              {/* Catégories Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {['Tous', 'Audit IA', 'Développement', 'Start-ups', 'Web-Marketing'].map((category) => (
                  <button
                    key={category}
                    className="px-6 py-3 bg-black/30 border border-jarvisGold/40 rounded-lg hover:border-jarvisGold/70 transition-all duration-300 hover:bg-jarvisGold/10 text-white font-semibold"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <article key={post.slug} className="group backdrop-blur-sm border border-jarvisGold/40 rounded-lg p-6 shadow-xl h-full flex flex-col relative overflow-hidden hover:border-jarvisGold/70 transition-all duration-300">
                    {post.trending && (
                      <div className="absolute top-4 right-4 bg-jarvisGold text-black px-3 py-1 rounded-full text-sm font-bold">
                        🔥 Trending
                      </div>
                    )}

                    <div className="absolute top-2 left-2 w-16 h-16 bg-monacoBlue/30 rounded-full blur-lg group-hover:bg-monacoBlue/40 transition-all duration-500"></div>

                    <div className="mb-4">
                      <span className="inline-block bg-jarvisGold/20 text-jarvisGold px-3 py-1 rounded-full text-sm font-semibold mb-3">
                        {post.category}
                      </span>
                      <div className="text-sm text-white/60 mb-2">
                        {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} • {post.readTime} min de lecture
                        {post.views && post.views > 0 && (
                          <> • {post.views} vues</>
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-jarvisGold transition-colors">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-white/80 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-jarvisGold hover:text-jarvisGold/80 font-semibold transition-colors"
                    >
                      Lire l'article
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </article>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-16 text-center">
                <div className="bg-black/30 border border-jarvisGold/40 rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-jarvisGold">Restez informé des dernières tendances</h3>
                  <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                    Nos articles sont automatiquement mis à jour selon les sujets les plus recherchés dans le domaine de l'IA et du développement.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block bg-jarvisGold hover:bg-jarvisGold/80 text-black font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
                  >
                    Nous contacter pour un projet
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}