# 📋 TODO - Optimisations SEO, Performance & Sécurité JARVIS

**Objectif :** Passer de 78/100 à 95+/100 en Best Practices Lighthouse
**Gain attendu :** -2,500 KB (-79% poids total) + Sécurité renforcée

---

## 🔴 PRIORITÉ 1 - OPTIMISATIONS IMAGES (Gain : -2,400 KB)
**Temps estimé : 2h | Risque : 0% | Impact : ★★★★★**

### ✅ Tâche 1.1 : Compresser les images sources
**Fichiers concernés :**
- [ ] `/public/images/Ava.png` (1.1 MB → 100 KB)
- [ ] `/public/images/brikka.png` (1.3 MB → 120 KB)
- [ ] `/public/images/team1.jpg` (226 KB → 50 KB)
- [ ] `/public/images/villa_azai_tu.png` (136 KB → 40 KB)
- [ ] `/public/images/team3.jpg` (85 KB → 20 KB)

**Outils recommandés :**
- TinyPNG : https://tinypng.com/
- Squoosh : https://squoosh.app/
- ImageOptim (Mac) : https://imageoptim.com/

**Instructions :**
1. Télécharger chaque image depuis `/public/images/`
2. Les compresser via TinyPNG ou Squoosh
3. Télécharger les versions compressées
4. Remplacer les originales dans `/public/images/`

---

### ✅ Tâche 1.2 : Activer l'optimisation Next.js
**Fichier : `/frontend/next.config.js`**

**Modifier ligne 5-7 :**
```javascript
// AVANT :
images: {
  unoptimized: true, // ❌
}

// APRÈS :
images: {
  unoptimized: false, // ✅
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

**Risque :** Faible - Peut casser si images externes (on teste après)

---

### ✅ Tâche 1.3 : Ajouter quality aux composants Image
**Fichiers :**
- [ ] `/src/components/ProjectsShowcase.tsx` (ligne 56-67)
- [ ] `/src/components/TeamSection.tsx` (ligne 81-90)

**Ajouter :**
```tsx
<Image
  src={...}
  alt={...}
  width={...}
  height={...}
  loading="lazy"
  quality={85} // ✅ AJOUTER
  placeholder="blur"
  blurDataURL="..."
/>
```

---

## 🟠 PRIORITÉ 2 - SÉCURITÉ HTTP HEADERS (Gain : +17 points)
**Temps estimé : 45 min | Risque : 10% | Impact : ★★★★★**

### ✅ Tâche 2.1 : Headers sans risque
**Fichier : `/frontend/next.config.js`**

**Ajouter après ligne 15 :**
```javascript
const nextConfig = {
  // ... config existante

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // HSTS - Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Anti-Clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Anti-MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Isolation fenêtre
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          // Referrer
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },

  // ... reste de la config
}
```

**Risque :** 0% - Headers standards

---

### ✅ Tâche 2.2 : Content Security Policy (CSP)
**Fichier : `/frontend/next.config.js`**

**Ajouter dans le tableau `headers` après Permissions-Policy :**
```javascript
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: http:",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'"
  ].join('; ')
}
```

**Risque :** 10% - Peut bloquer GTM si mal configuré

**Test après déploiement :**
1. Ouvrir Console navigateur (F12)
2. Vérifier aucune erreur CSP
3. Tester GTM fonctionne
4. Tester formulaire contact fonctionne

---

## 🟡 PRIORITÉ 3 - OPTIMISATIONS JAVASCRIPT (Gain : -120 KB)
**Temps estimé : 2h | Risque : 30% | Impact : ★★★☆☆**

### ✅ Tâche 3.1 : Différer Google Tag Manager
**Fichier : `/src/app/layout.tsx`**

**Modifier ligne 51 :**
```tsx
// AVANT :
<Script
  id="gtm-script"
  strategy="afterInteractive" // ❌
/>

// APRÈS :
<Script
  id="gtm-script"
  strategy="lazyOnload" // ✅ Charge après interactivité
/>
```

**Risque :** 0% - GTM chargera juste 1-2s plus tard

---

### ✅ Tâche 3.2 : Tree shaking packages additionnels
**Fichier : `/frontend/next.config.js`**

**Modifier ligne 8-10 :**
```javascript
// AVANT :
experimental: {
  optimizePackageImports: ['framer-motion'],
}

// APRÈS :
experimental: {
  optimizePackageImports: [
    'framer-motion',
    '@headlessui/react',
    '@heroicons/react'
  ],
}
```

**Risque :** 5% - Rare mais peut casser l'import

---

### ✅ Tâche 3.3 : Code splitting Framer Motion
**Fichier : `/src/components/TeamSection.tsx`**

**Modifier ligne 5 :**
```tsx
// AVANT :
import { motion } from 'framer-motion';

// APRÈS :
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
);

// Puis remplacer tous les <motion.div> par <MotionDiv>
```

**Risque :** 30% - Animations peuvent sauter, besoin de tester

**Répéter pour :**
- [ ] `/src/components/HomeSequence.tsx`
- [ ] Autres composants utilisant Framer Motion

---

### ✅ Tâche 3.4 : Optimiser HomeSequence lazy loading
**Fichier : `/src/components/HomeSequence.tsx`**

**Modifier ligne 83-96 pour charger au scroll :**
```tsx
// Utiliser Intersection Observer
// Charger FAQTeaser et ProjectsShowcase uniquement quand visibles
```

**Risque :** 20% - Complexe, peut casser le scroll

---

## 🟢 PRIORITÉ 4 - MISE À JOUR & MODERNISATION
**Temps estimé : 1h | Risque : 40% | Impact : ★★☆☆☆**

### ✅ Tâche 4.1 : Mettre à jour Next.js
**Commandes :**
```bash
cd /Users/JARVIS/Desktop/JARVIS/frontend
npm install next@latest react@latest react-dom@latest
npm run build  # Tester que ça build
```

**Risque :** 40% - Breaking changes possibles entre 14.0.3 → 14.2.x

**Si erreurs :**
- Revenir en arrière : `npm install next@14.0.3`
- Checker release notes : https://github.com/vercel/next.js/releases

---

### ✅ Tâche 4.2 : Configurer browserslist moderne
**Fichier : `/frontend/package.json`**

**Ajouter après ligne 46 :**
```json
{
  // ... config existante

  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions"
  ]
}
```

**Risque :** 5% - Peut casser IE11 (mais on s'en fout)

---

### ✅ Tâche 4.3 : Activer SWC minifier
**Fichier : `/frontend/next.config.js`**

**Ajouter après ligne 15 :**
```javascript
const nextConfig = {
  // ... config existante

  swcMinify: true, // ✅ AJOUTER (plus rapide que Terser)

  // ... reste
}
```

**Risque :** 10% - Rare mais peut causer bugs minification

---

## 🧪 TESTS APRÈS CHAQUE PHASE

### Test local :
```bash
cd /Users/JARVIS/Desktop/JARVIS/frontend
npm run dev
```

**Vérifier :**
- [ ] Site charge correctement
- [ ] Images s'affichent
- [ ] Animations fonctionnent
- [ ] GTM fonctionne (console F12)
- [ ] Formulaire contact fonctionne
- [ ] Aucune erreur console

### Test build :
```bash
npm run build
```

**Vérifier :**
- [ ] Build réussit sans erreurs
- [ ] Tailles des bundles ont diminué
- [ ] Lighthouse score améliore

### Test production :
```bash
npm start
```

**Vérifier :**
- [ ] Site démarre
- [ ] Tout fonctionne comme en dev

---

## 📦 DÉPLOIEMENT INFOMANIAK

### Étapes :
```bash
# 1. Commit local
git add .
git commit -m "Optimisations SEO: images, sécurité, performance"
git push origin main

# 2. SSH Infomaniak
ssh client@ik-xxx-xxx.infomaniak.com
cd /srv/customer/sites/jarvis-mc.com/frontend

# 3. Pull + redémarrage
git pull origin main
# Redémarrer via interface Infomaniak
```

**Commandes Infomaniak :**
- Build : `echo "Build fait localement"`
- Start : `cd frontend && npm start`

---

## 📊 RÉSULTATS ATTENDUS

### Avant optimisations :
| Métrique | Valeur |
|----------|--------|
| Best Practices | 78/100 |
| Poids total | 3,152 KB |
| Images | 2,800 KB |
| JavaScript | 250 KB |
| Vulnérabilités | 5 critiques |

### Après optimisations :
| Métrique | Valeur | Gain |
|----------|--------|------|
| Best Practices | **95+/100** ✅ | **+17** |
| Poids total | **~650 KB** | **-79%** |
| Images | **~200 KB** | **-93%** |
| JavaScript | **~130 KB** | **-48%** |
| Vulnérabilités | **0** | **-5** |

---

## ⏱️ TEMPS TOTAL ESTIMÉ

- **Priorité 1 (Images)** : 2h
- **Priorité 2 (Sécurité)** : 45min
- **Priorité 3 (JavaScript)** : 2h
- **Priorité 4 (Mise à jour)** : 1h
- **Tests** : 1h

**TOTAL : 6-7 heures**

---

## 🚦 ORDRE D'EXÉCUTION RECOMMANDÉ

### Session 1 (2h30) - Impact maximum :
1. ✅ Tâche 1.1 - Compresser images (2h)
2. ✅ Tâche 1.2 - Activer optimisation Next.js (15min)
3. ✅ Tâche 1.3 - Ajouter quality (15min)
4. 🧪 **TEST BUILD + DEPLOY**

**Gain immédiat : -2,400 KB**

### Session 2 (1h) - Sécurité :
5. ✅ Tâche 2.1 - Headers sans risque (30min)
6. ✅ Tâche 2.2 - CSP (15min)
7. ✅ Tâche 3.1 - Différer GTM (5min)
8. 🧪 **TEST BUILD + DEPLOY**

**Gain : +17 points Best Practices**

### Session 3 (2h30) - JavaScript (optionnel) :
9. ✅ Tâche 3.2 - Tree shaking (15min)
10. ✅ Tâche 3.3 - Code splitting Framer Motion (1h)
11. ✅ Tâche 4.1 - Update Next.js (30min)
12. ✅ Tâche 4.2-4.3 - Browserslist + SWC (15min)
13. 🧪 **TEST BUILD + DEPLOY**

**Gain : -120 KB JavaScript**

---

## ⚠️ NOTES IMPORTANTES

### En cas de problème :
1. **Revenir en arrière :**
   ```bash
   git reset --hard HEAD~1
   git push --force origin main
   ```

2. **Désactiver une optimisation :**
   - Commenter la ligne problématique
   - Rebuild + redeploy

3. **Tester CSP :**
   - Ouvrir Console (F12)
   - Onglet "Network"
   - Chercher erreurs CSP

### Sauvegardes :
- [ ] Backup de `/public/images/` avant compression
- [ ] Backup de `next.config.js` avant modifs
- [ ] Snapshot Git avant chaque phase

---

## 📞 SUPPORT

Si blocage :
1. Checker les erreurs dans console navigateur (F12)
2. Vérifier les logs build : `npm run build`
3. Tester en local d'abord : `npm run dev`
4. Demander à Claude de débugger

---

**📅 Date de création :** 2025-10-02
**🎯 Objectif :** Score Lighthouse 95+ en Best Practices
**✅ Prêt à démarrer !**
