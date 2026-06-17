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
@@ -29,6 +76,10 @@ const nextConfig = {
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
@@ -39,15 +90,19 @@ const nextConfig = {
},
{
key: 'X-XSS-Protection',
          value: '1; mode=block',
          value: '0',
},
{
key: 'Referrer-Policy',
value: 'strict-origin-when-cross-origin',
},
{
key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), battery=(), display-capture=(), encrypted-media=(), fullscreen=(self), gamepad=(), hid=(), idle-detection=(), keyboard-map=(), local-fonts=(), magnetometer=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), serial=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
},
],
},
@@ -78,6 +133,15 @@ const nextConfig = {
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
