import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Autres options de configuration
  images: {
    unoptimized: true, // Nécessaire pour les exports statiques
  },
};

export default nextConfig;
