import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustSection from '@/components/TrustSection'
import FeaturedWork from '@/components/FeaturedWork'
import ServicesSection from '@/components/ServicesSection'
import WhyBrandex from '@/components/WhyBrandex'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <FeaturedWork />
        <ServicesSection />
        <WhyBrandex />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
