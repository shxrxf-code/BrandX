'use client'

import { useState, useEffect, useCallback } from 'react'
import Preloader from '@/components/Preloader'
import HeroSection from '@/components/HeroSection'
import StorySection from '@/components/StorySection'
import ServicesShowcase from '@/components/ServicesShowcase'
import WorkflowSection from '@/components/WorkflowSection'
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
        <StorySection />
        <ServicesShowcase />
        <WorkflowSection />
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
