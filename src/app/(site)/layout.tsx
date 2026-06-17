import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  metadataBase: new URL('https://brandexdigital.in'),
  title: {
    default: 'Brandex — Digital Experience Studio',
    template: '%s | Brandex',
  },
  description:
    'We build digital products that drive real growth. Web development, UI/UX design, brand identity, and AI solutions.',
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
    description: 'We build digital products that drive real growth.',
    siteName: 'Brandex',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Brandex' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brandex — Digital Experience Studio',
    description: 'We build digital products that drive real growth.',
    images: ['/opengraph-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Analytics />
    </>
  )
}
