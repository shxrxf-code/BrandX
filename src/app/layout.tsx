import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://brandexdigital.in'),
  title: {
    default: 'Brandex Digital — Premium Digital Transformation Partner',
    template: '%s | Brandex Digital',
  },
  description:
    'A premium digital transformation partner helping ambitious brands dominate online. Strategy, design, technology, and growth — engineered for measurable impact.',
  keywords: [
    'digital agency',
    'premium agency',
    'brand transformation',
    'web design',
    'brand strategy',
    'enterprise design',
    'digital consultancy',
  ],
  authors: [{ name: 'Brandex Digital' }],
  creator: 'Brandex Digital',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://brandexdigital.in',
    title: 'Brandex Digital — Premium Digital Transformation Partner',
    description:
      'Strategy, design, technology, and growth — engineered for ambitious brands.',
    siteName: 'Brandex Digital',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Brandex Digital — Premium Digital Transformation Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandex Digital — Premium Digital Transformation Partner',
    description:
      'Strategy, design, technology, and growth — engineered for ambitious brands.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-sans antialiased bg-background text-text-primary selection:bg-accent/40 selection:text-white">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
