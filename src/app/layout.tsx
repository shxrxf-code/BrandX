import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Preloader from '@/components/Preloader'
import SmoothScroll from '@/components/SmoothScroll'
import AmbientMotion from '@/components/AmbientMotion'
import { NavigationProvider } from '@/components/NavigationProvider'
import BodyContent from './body-content'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
}

export const metadata: Metadata = {
  title: 'Brandex Digital | Premium Digital Agency',
  description: 'We craft cinematic digital experiences that elevate brands, drive growth, and leave lasting impressions. Award-winning web design, development, and digital marketing.',
  keywords: ['digital agency', 'web design', 'brand identity', 'web development', 'digital marketing', 'UI/UX design'],
  authors: [{ name: 'Brandex Digital' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://brandexdigital.in',
    title: 'Brandex Digital | Premium Digital Agency',
    description: 'We craft cinematic digital experiences that elevate brands and drive measurable growth.',
    siteName: 'Brandex Digital',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Brandex Digital — Premium Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandex Digital | Premium Digital Agency',
    description: 'We craft cinematic digital experiences that elevate brands and drive measurable growth.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-background text-white selection:bg-accent-blue/30 selection:text-white">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Preloader />
        <AmbientMotion />
        <SmoothScroll>
          <NavigationProvider>
            <BodyContent>{children}</BodyContent>
          </NavigationProvider>
        </SmoothScroll>
        <div className="noise" />
        <Analytics />
      </body>
    </html>
  )
}
