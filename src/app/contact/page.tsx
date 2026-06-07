import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact — Start a Project',
  description: 'Tell us about your project. We reply to every inquiry within 24 hours.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ContactHero />
        <ContactForm />
        <ContactInfo />
      </main>
      <Footer />
    </>
  )
}
