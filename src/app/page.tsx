'use client'

import { useState, useCallback } from 'react'
import Preloader from '@/components/Preloader'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import TechUniverse from '@/components/TechUniverse'
import MetricsSection from '@/components/MetricsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [loading, setLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <Preloader onComplete={handleComplete} />}
      <main className={loading ? 'invisible' : 'visible'}>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <CaseStudiesSection />
        <TechUniverse />
        <MetricsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
