import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import AboutSection from '@/components/AboutSection'
import ProcessSection from '@/components/ProcessSection'
import TechStackSection from '@/components/TechStackSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TechStackSection />
      <TestimonialsSection />
      <ContactSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
