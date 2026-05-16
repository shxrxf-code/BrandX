import Hero from '@/components/Hero'
import Trust from '@/components/Trust'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Process from '@/components/Process'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Trust />
      <Services />
      <Portfolio />
      <Process />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
