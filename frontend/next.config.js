/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // Performance optimizations for TBT improvement
  images: {
    unoptimized: true, // Nécessaire pour les exports statiques
  },
  experimental: {
    optimizePackageImports: ['framer-motion'], // Optimize heavy packages
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Enable React strict mode for performance
};

module.exports = nextConfig;
