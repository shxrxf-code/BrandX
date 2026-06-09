'use client'

import { useState, useEffect, useCallback } from 'react'
import Preloader from '@/components/Preloader'
import HeroSection from '@/components/HeroSection'
import HowBrandexWorks from '@/components/HowBrandexWorks'
import InsideTheStudio from '@/components/InsideTheStudio'
import ServicesShowcase from '@/components/ServicesShowcase'
import ProjectTransformation from '@/components/ProjectTransformation'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import TechUniverse from '@/components/TechUniverse'
import MetricsSection from '@/components/MetricsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import InsightsSection from '@/components/InsightsSection'
import FinalCTASection from '@/components/FinalCTASection'
import Footer from '@/components/Footer'

export default function Home() {
  const [loading, setLoading] = useState(true)

  const handleComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) {
      setLoading(false)
    }
  }, [])

  return (
    <>
      {loading && <Preloader onComplete={handleComplete} />}
      <main className={loading ? 'invisible' : 'visible'}>
        <HeroSection />
        <HowBrandexWorks />
        <InsideTheStudio />
        <ServicesShowcase />
        <ProjectTransformation />
        <CaseStudiesSection />
        <TechUniverse />
        <MetricsSection />
        <TestimonialsSection />
        <InsightsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
