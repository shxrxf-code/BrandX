'use client'

import { useState, useCallback } from 'react'
import Preloader from '@/components/Preloader'
import HeroSection from '@/components/HeroSection'
import FeaturedCaseStudySection from '@/components/FeaturedCaseStudySection'
import ProcessSection from '@/components/ProcessSection'
import ServicesSection from '@/components/ServicesSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import TechUniverse from '@/components/TechUniverse'
import MetricsSection from '@/components/MetricsSection'
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
        <FeaturedCaseStudySection />
        <ProcessSection />
        <ServicesSection />
        <CaseStudiesSection />
        <TechUniverse />
        <MetricsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
