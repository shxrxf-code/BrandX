import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServicesHero from '@/components/services/ServicesHero'
import ServicesGrid from '@/components/services/ServicesGrid'
import ServicesProcess from '@/components/services/ServicesProcess'
import ServicesTestimonial from '@/components/services/ServicesTestimonial'
import ServicesCTA from '@/components/services/ServicesCTA'
import ServicesFAQ from '@/components/services/ServicesFAQ'

export const metadata: Metadata = {
  title: 'Services — Capabilities Built for Scale',
  description: 'Six tightly-defined capabilities — brand, web, product, SEO, performance, and mobile. Enterprise services, studio intimacy.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ServicesHero />
        <ServicesGrid />
        <ServicesProcess />
        <ServicesTestimonial />
        <ServicesFAQ />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}
