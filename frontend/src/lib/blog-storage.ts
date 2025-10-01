import fs from 'fs';
import path from 'path';

// Interface pour les articles de blog
export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  keywords: string[];
  priority: number;
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    schema: any;
  };
  createdAt: string;
  publishedAt: string;
  author: string;
  readTime: number;
  trending: boolean;
  status: 'draft' | 'published' | 'archived';
  views?: number;
  lastModified?: string;
}

const BLOG_DATA_DIR = path.join(process.cwd(), 'src', 'data', 'blog');
const ARTICLES_FILE = path.join(BLOG_DATA_DIR, 'articles.json');
const STATS_FILE = path.join(BLOG_DATA_DIR, 'stats.json');

// Créer le répertoire s'il n'existe pas
function ensureDataDirectory() {
  if (!fs.existsSync(BLOG_DATA_DIR)) {
    fs.mkdirSync(BLOG_DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(ARTICLES_FILE)) {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify([], null, 2));
  }

  if (!fs.existsSync(STATS_FILE)) {
    fs.writeFileSync(STATS_FILE, JSON.stringify({
      totalArticles: 0,
      publishedArticles: 0,
      totalViews: 0,
      lastGenerated: null,
      categoriesStats: {},
      topKeywords: []
    }, null, 2));
  }
}

// Sauvegarder un nouvel article
export function saveArticle(article: BlogArticle): boolean {
  try {
    ensureDataDirectory();

    const articles = loadAllArticles();

    // Vérifier si l'article existe déjà
    const existingIndex = articles.findIndex(a => a.slug === article.slug);

    if (existingIndex >= 0) {
      // Mettre à jour l'article existant
      articles[existingIndex] = {
        ...article,
        lastModified: new Date().toISOString()
      };
    } else {
      // Ajouter un nouvel article
      articles.push(article);
    }

    // Sauvegarder les articles
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2));

    // Mettre à jour les statistiques
    updateStats();

    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'article:', error);
    return false;
  }
}

// Charger tous les articles
export function loadAllArticles(): BlogArticle[] {
  try {
    ensureDataDirectory();

    if (!fs.existsSync(ARTICLES_FILE)) {
      return [];
    }

    const data = fs.readFileSync(ARTICLES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors du chargement des articles:', error);
    return [];
  }
}

// Charger les articles publiés seulement
export function loadPublishedArticles(): BlogArticle[] {
  const articles = loadAllArticles();
  return articles.filter(article => article.status === 'published');
}

// Charger un article par son slug
export function loadArticleBySlug(slug: string): BlogArticle | null {
  const articles = loadAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

// Charger les articles par catégorie
export function loadArticlesByCategory(category: string): BlogArticle[] {
  const articles = loadPublishedArticles();
  return articles.filter(article => article.category === category);
}

// Charger les articles tendances
export function loadTrendingArticles(): BlogArticle[] {
  const articles = loadPublishedArticles();
  return articles
    .filter(article => article.trending)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);
}

// Charger les articles récents
export function loadRecentArticles(limit: number = 10): BlogArticle[] {
  const articles = loadPublishedArticles();
  return articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// Supprimer un article
export function deleteArticle(slug: string): boolean {
  try {
    ensureDataDirectory();

    const articles = loadAllArticles();
    const filteredArticles = articles.filter(article => article.slug !== slug);

    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(filteredArticles, null, 2));
    updateStats();

    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    return false;
  }
}

// Mettre à jour le statut d'un article
export function updateArticleStatus(slug: string, status: 'draft' | 'published' | 'archived'): boolean {
  try {
    const articles = loadAllArticles();
    const articleIndex = articles.findIndex(a => a.slug === slug);

    if (articleIndex >= 0) {
      articles[articleIndex].status = status;
      articles[articleIndex].lastModified = new Date().toISOString();

      if (status === 'published' && !articles[articleIndex].publishedAt) {
        articles[articleIndex].publishedAt = new Date().toISOString();
      }

      fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2));
      updateStats();
      return true;
    }

    return false;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    return false;
  }
}

// Incrémenter les vues d'un article
export function incrementArticleViews(slug: string): void {
  try {
    const articles = loadAllArticles();
    const articleIndex = articles.findIndex(a => a.slug === slug);

    if (articleIndex >= 0) {
      articles[articleIndex].views = (articles[articleIndex].views || 0) + 1;
      fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2));
      updateStats();
    }
  } catch (error) {
    console.error('Erreur lors de l\'incrémentation des vues:', error);
  }
}

// Mettre à jour les statistiques
function updateStats(): void {
  try {
    const articles = loadAllArticles();
    const publishedArticles = articles.filter(a => a.status === 'published');

    // Calculer les statistiques par catégorie
    const categoriesStats: { [key: string]: number } = {};
    publishedArticles.forEach(article => {
      categoriesStats[article.category] = (categoriesStats[article.category] || 0) + 1;
    });

    // Extraire les mots-clés les plus populaires
    const keywordCounts: { [key: string]: number } = {};
    publishedArticles.forEach(article => {
      article.keywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });

    const topKeywords = Object.entries(keywordCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([keyword, count]) => ({ keyword, count }));

    const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);

    const stats = {
      totalArticles: articles.length,
      publishedArticles: publishedArticles.length,
      totalViews,
      lastGenerated: new Date().toISOString(),
      categoriesStats,
      topKeywords
    };

    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error('Erreur lors de la mise à jour des statistiques:', error);
  }
}

// Charger les statistiques
export function loadStats() {
  try {
    ensureDataDirectory();

    if (!fs.existsSync(STATS_FILE)) {
      return {
        totalArticles: 0,
        publishedArticles: 0,
        totalViews: 0,
        lastGenerated: null,
        categoriesStats: {},
        topKeywords: []
      };
    }

    const data = fs.readFileSync(STATS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error);
    return null;
  }
}

// Rechercher des articles
export function searchArticles(query: string, category?: string): BlogArticle[] {
  const articles = loadPublishedArticles();
  const searchTerm = query.toLowerCase();

  return articles.filter(article => {
    const matchesQuery =
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));

    const matchesCategory = !category || article.category === category;

    return matchesQuery && matchesCategory;
  });
}

// Générer un slug unique
export function generateUniqueSlug(baseTitle: string): string {
  const articles = loadAllArticles();
  let slug = baseTitle
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

  let counter = 1;
  let uniqueSlug = slug;

  while (articles.some(article => article.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}