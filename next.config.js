/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  basePath:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASEPATH
      : "",
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  images: {
    domains: [
      // News source domains
      "i.dawn.com",
      "i.tribune.com.pk",
      "www.geo.tv",
      "www.thenews.com.pk",
      "www.nation.com.pk",
      "arynews.tv",
      "dunyanews.tv",
      
      // Your domain
      "thenewsgenie.com",
      
      // Common image hosting services
      "res.cloudinary.com",
      "images.unsplash.com",
      "imgur.com",
      "i.imgur.com",
      
      // Vercel deployment domains
      "thenewsgenie-web.vercel.app",
      "vercel.app",
      "vercel.com"
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Add the rewrites function
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots"
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'thenewsgenie-web.vercel.app',
          },
        ],
        destination: 'https://thenewsgenie.com/:path*',
        permanent: true,
      },
    ];
  },
  // Add headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800'
          }
        ]
      }
    ];
  },
  // Enable compression
  compress: true,
  // Add powered by header
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
  // Enable strict mode for better error catching
  reactStrictMode: true,
};

module.exports = nextConfig;
