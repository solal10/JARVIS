// Script de vérification des performances SEO - SARL JARVIS
// Usage: node performance-check.js

const https = require('https');
const fs = require('fs');

const BASE_URL = 'https://jarvis-mc.com';
const PAGES_TO_CHECK = [
  '/',
  '/services/audit-conseil-ia',
  '/services/developpement-logiciel',
  '/services/solutions-web-marketing',
  '/services/support-maintenance',
  '/services/offre-jarvis-start-ups',
  '/a-propos',
  '/contact',
  '/faq',
  '/sitemap.xml',
  '/robots.txt'
];

async function checkPageStatus(path) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${path}`;
    const startTime = Date.now();

    https.get(url, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          status: res.statusCode,
          responseTime,
          contentLength: data.length,
          hasTitle: data.includes('<title>'),
          hasH1: data.includes('<h1'),
          hasMetaDescription: data.includes('name="description"'),
          hasSchema: data.includes('"@type"'),
          hasCanonical: data.includes('rel="canonical"') || data.includes('"canonical"')
        });
      });
    }).on('error', (err) => {
      resolve({
        path,
        status: 'ERROR',
        error: err.message,
        responseTime: 0
      });
    });
  });
}

async function runPerformanceCheck() {
  console.log('🚀 Vérification des performances SEO - SARL JARVIS\n');
  console.log('Base URL:', BASE_URL);
  console.log('Pages à vérifier:', PAGES_TO_CHECK.length);
  console.log('─'.repeat(80));

  const results = [];

  for (const page of PAGES_TO_CHECK) {
    process.stdout.write(`Vérification ${page}... `);
    const result = await checkPageStatus(page);
    results.push(result);

    if (result.status === 200) {
      console.log(`✅ ${result.responseTime}ms`);
    } else {
      console.log(`❌ ${result.status || 'ERROR'}`);
    }
  }

  console.log('\n' + '─'.repeat(80));
  console.log('📊 RÉSUMÉ DES PERFORMANCES\n');

  // Statistiques générales
  const successful = results.filter(r => r.status === 200);
  const avgResponseTime = successful.reduce((sum, r) => sum + r.responseTime, 0) / successful.length;

  console.log(`✅ Pages accessibles: ${successful.length}/${results.length}`);
  console.log(`⏱️  Temps de réponse moyen: ${Math.round(avgResponseTime)}ms`);
  console.log(`📄 Temps de réponse le plus lent: ${Math.max(...successful.map(r => r.responseTime))}ms`);

  // Vérifications SEO
  console.log('\n🔍 AUDIT SEO:');
  const seoChecks = {
    'Balises <title>': successful.filter(r => r.hasTitle).length,
    'Balises <h1>': successful.filter(r => r.hasH1).length,
    'Meta descriptions': successful.filter(r => r.hasMetaDescription).length,
    'Schema.org': successful.filter(r => r.hasSchema).length,
    'URLs canoniques': successful.filter(r => r.hasCanonical).length
  };

  Object.entries(seoChecks).forEach(([check, count]) => {
    const percentage = Math.round((count / successful.length) * 100);
    const status = percentage === 100 ? '✅' : percentage >= 80 ? '⚠️' : '❌';
    console.log(`${status} ${check}: ${count}/${successful.length} (${percentage}%)`);
  });

  // Recommandations
  console.log('\n💡 RECOMMANDATIONS:');
  if (avgResponseTime > 1000) {
    console.log('⚠️  Optimiser les temps de réponse (actuellement > 1s)');
  }
  if (seoChecks['Meta descriptions'] < successful.length) {
    console.log('⚠️  Ajouter des meta descriptions manquantes');
  }
  if (seoChecks['Schema.org'] < successful.length) {
    console.log('⚠️  Implémenter Schema.org sur toutes les pages');
  }

  // Sauvegarde des résultats
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    summary: {
      totalPages: results.length,
      successfulPages: successful.length,
      averageResponseTime: Math.round(avgResponseTime),
      seoScore: Math.round((Object.values(seoChecks).reduce((a, b) => a + b, 0) / (Object.keys(seoChecks).length * successful.length)) * 100)
    },
    details: results,
    seoChecks
  };

  fs.writeFileSync('seo-performance-report.json', JSON.stringify(report, null, 2));
  console.log('\n📋 Rapport sauvegardé dans: seo-performance-report.json');

  return report;
}

// Exécution du script
if (require.main === module) {
  runPerformanceCheck().catch(console.error);
}

module.exports = { runPerformanceCheck };