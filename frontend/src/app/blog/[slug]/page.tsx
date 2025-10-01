import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PixelWave from '@/components/PixelWave';
import { loadArticleBySlug, incrementArticleViews, loadRecentArticles } from '@/lib/blog-storage';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

// Générer les métadonnées SEO pour chaque article
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = loadArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article non trouvé | JARVIS',
      description: 'Cet article n&apos;existe pas ou a été supprimé.'
    };
  }

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    keywords: article.seo?.keywords,
    openGraph: {
      title: article.seo?.ogTitle || article.title,
      description: article.seo?.ogDescription || article.excerpt,
      images: article.seo?.ogImage ? [article.seo.ogImage] : undefined,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo?.ogTitle || article.title,
      description: article.seo?.ogDescription || article.excerpt,
      images: article.seo?.ogImage ? [article.seo.ogImage] : undefined,
    },
    alternates: {
      canonical: article.seo?.canonicalUrl
    }
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = loadArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Incrémenter les vues
  incrementArticleViews(params.slug);

  // Charger les articles connexes
  const recentArticles = loadRecentArticles(4).filter(a => a.slug !== params.slug).slice(0, 3);

  return (
    <>
      {/* Schema.org JSON-LD pour l'article */}
      {article.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article.seo.schema) }}
        />
      )}

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
          {/* Breadcrumb personnalisé pour l'article */}
          <nav aria-label="Fil d'Ariane" className="py-4 px-6 border-b border-jarvisGold/20">
            <div className="max-w-4xl mx-auto">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-jarvisGold hover:text-jarvisGold/80 transition-colors duration-200">
                    Accueil
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2 text-jarvisGold/60" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  <Link href="/blog" className="text-jarvisGold hover:text-jarvisGold/80 transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2 text-jarvisGold/60" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-semibold" aria-current="page">
                    {article.title}
                  </span>
                </li>
              </ol>
            </div>
          </nav>

          {/* Article content */}
          <article className="py-16 px-6 text-white">
            <div className="max-w-4xl mx-auto">
              {/* Article header */}
              <header className="mb-12">
                <div className="mb-6">
                  <span className="inline-block bg-jarvisGold/20 text-jarvisGold px-4 py-2 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>
                  {article.trending && (
                    <span className="ml-3 inline-block bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                      🔥 Trending
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                  {article.title}
                </h1>

                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readTime} min de lecture
                  </div>

                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {article.author}
                  </div>

                  {article.views && article.views > 0 && (
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {article.views} vues
                    </div>
                  )}
                </div>
              </header>

              {/* Article body */}
              <div
                className="prose prose-lg prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  color: 'white'
                }}
              />

              {/* Article keywords */}
              {article.keywords && article.keywords.length > 0 && (
                <div className="mb-12 p-6 bg-black/30 border border-jarvisGold/40 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-jarvisGold">Mots-clés</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-jarvisGold/10 text-jarvisGold px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to action */}
              <div className="mb-16 p-8 bg-black/30 border border-jarvisGold/40 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4 text-jarvisGold">Besoin d'accompagnement ?</h3>
                <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                  JARVIS vous accompagne dans vos projets de transformation digitale et d'intelligence artificielle.
                  Contactez nos experts basés à Monaco pour une consultation personnalisée.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-jarvisGold hover:bg-jarvisGold/80 text-black font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  Nous contacter
                </Link>
              </div>

              {/* Articles connexes */}
              {recentArticles.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-8 text-jarvisGold">Articles récents</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {recentArticles.map((relatedArticle) => (
                      <article key={relatedArticle.slug} className="bg-black/30 border border-jarvisGold/40 rounded-lg p-6 hover:border-jarvisGold/70 transition-all duration-300">
                        <div className="mb-3">
                          <span className="bg-jarvisGold/20 text-jarvisGold px-2 py-1 rounded text-xs font-semibold">
                            {relatedArticle.category}
                          </span>
                        </div>
                        <h3 className="font-bold mb-2 text-white hover:text-jarvisGold transition-colors">
                          <Link href={`/blog/${relatedArticle.slug}`} className="hover:underline">
                            {relatedArticle.title}
                          </Link>
                        </h3>
                        <p className="text-white/80 text-sm mb-3 line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="text-xs text-white/60">
                          {relatedArticle.readTime} min de lecture
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}