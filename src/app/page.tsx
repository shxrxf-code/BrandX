import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Trust from '@/components/Trust'
import Services from '@/components/Services'
import CoverFlow from '@/components/CoverFlow'
import Process from '@/components/Process'
import About from '@/components/About'
import Metrics from '@/components/Metrics'
import TechStack from '@/components/TechStack'
import Testimonials from '@/components/Testimonials'
import WhyBrandex from '@/components/WhyBrandex'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <ErrorBoundary>
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <CoverFlow />
      <Process />
      <About />
      <Metrics />
      <TechStack />
      <Testimonials />
      <WhyBrandex />
      <FAQ />
      <CTA />
      <Footer />
    </ErrorBoundary>
  )
}
