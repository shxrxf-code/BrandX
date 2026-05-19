import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Trust from '@/components/Trust'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Process from '@/components/Process'
import About from '@/components/About'
import Metrics from '@/components/Metrics'
import TechStack from '@/components/TechStack'
import Testimonials from '@/components/Testimonials'
import WhyBrandex from '@/components/WhyBrandex'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <Portfolio />
      <Process />
      <About />
      <Metrics />
      <TechStack />
      <Testimonials />
      <WhyBrandex />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}
