/** @type {import('next').NextConfig} */

const cspDirectives = {
  'base-uri': ["'self'"],
  'child-src': ["'none'"],
  'connect-src': [
    "'self'",
    'https://vitals.vercel-insights.com',
    'https://images.unsplash.com',
  ],
  'default-src': ["'self'"],
  'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'frame-src': ["'none'"],
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https://images.unsplash.com',
  ],
  'manifest-src': ["'self'"],
  'media-src': ["'none'"],
  'object-src': ["'none'"],
  'prefetch-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
  ],
  'script-src-attr': ["'none'"],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
  ],
  'upgrade-insecure-requests': [],
  'worker-src': ["'self'", 'blob:'],
}

const cspString = Object.entries(cspDirectives)
  .map(([key, values]) => {
    if (values.length === 0) return key
    return `${key} ${values.join(' ')}`
  })
  .join('; ')

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    optimizePackageImports: [],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: cspString,
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '0',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), battery=(), display-capture=(), encrypted-media=(), fullscreen=(self), gamepad=(), hid=(), idle-detection=(), keyboard-map=(), local-fonts=(), magnetometer=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), serial=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/fonts/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      ],
    },
  ],
}

module.exports = nextConfig
