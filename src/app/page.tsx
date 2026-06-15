import HeroSection from '@/components/HeroSection'
import FeaturedCaseStudySection from '@/components/FeaturedCaseStudySection'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import TechStackSection from '@/components/TechStackSection'
import ResultsSection from '@/components/ResultsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCaseStudySection />
      <ServicesSection />
      <ProcessSection />
      <CaseStudiesSection />
      <TechStackSection />
      <ResultsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
