/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // Performance optimizations for TBT improvement
  images: {
    unoptimized: false, // Optimisation activée pour WebP/AVIF automatique
  },
  experimental: {
    optimizePackageImports: ['framer-motion'], // Optimize heavy packages
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  poweredByHeader: false, // Remove X-Powered-By header
  reactStrictMode: true, // Enable React strict mode for performance
  swcMinify: true, // Use SWC minifier (faster than Terser)

  // Security headers
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
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: http:",
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'"
            ].join('; ')
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;
