import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutTimeline from '@/components/about/AboutTimeline'
import AboutValues from '@/components/about/AboutValues'
import AboutTeam from '@/components/about/AboutTeam'
import AboutCTA from '@/components/about/AboutCTA'

export const metadata: Metadata = {
  title: 'About — A Studio, Not An Agency',
  description: 'We are a small, senior team of designers, engineers, and strategists building premium digital experiences for ambitious brands.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <AboutHero />
        <AboutStory />
        <AboutTimeline />
        <AboutValues />
        <AboutTeam />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
