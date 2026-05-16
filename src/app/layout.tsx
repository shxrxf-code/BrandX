import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Preloader from '@/components/Preloader'
import SmoothScroll from '@/components/SmoothScroll'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Digital Agency | Ultra-Premium Creative Studio',
  description: 'We build cinematic digital experiences and high-end digital status for world-class brands.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="font-sans antialiased bg-background text-primary selection:bg-accent-blue/30 overflow-x-hidden">
        <Preloader />
        <SmoothScroll>
          <div className="relative z-0">
            {children}
          </div>
        </SmoothScroll>
        <div className="noise" />
      </body>
    </html>
  )
}
