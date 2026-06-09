import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import SmoothScroll from '@/components/providers/SmoothScroll'
import Navbar from '@/components/Navbar'

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

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
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
    default: 'Brandex — Digital Experience Studio',
    template: '%s | Brandex',
  },
  description:
    'We engineer digital experiences that drive business growth. Premium web development, UI/UX design, brand identity, and AI solutions.',
  keywords: [
    'web development',
    'UI/UX design',
    'brand identity',
    'SEO',
    'digital marketing',
    'AI solutions',
    'digital experience',
  ],
  authors: [{ name: 'Brandex Digital' }],
  creator: 'Brandex Digital',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://brandexdigital.in',
    title: 'Brandex — Digital Experience Studio',
    description: 'Premium web development, UI/UX, brand identity, and AI solutions.',
    siteName: 'Brandex',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Brandex' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandex — Digital Experience Studio',
    description: 'Premium web development, UI/UX, brand identity, and AI solutions.',
    images: ['/opengraph-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased">
        <SmoothScroll>
          <Navbar />
          {children}
          <div className="grain" />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
