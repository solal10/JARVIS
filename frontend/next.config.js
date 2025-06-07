/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // Autres options de configuration
  images: {
    unoptimized: true, // Nécessaire pour les exports statiques
  },
};

module.exports = nextConfig;
