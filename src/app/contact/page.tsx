import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Tell us about your project.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="pt-40">
        <section className="px-6 md:px-12">
          <div className="max-w-content mx-auto">
            <h1 className="text-hero font-semibold text-foreground max-w-text">
              Get in touch.
            </h1>
            <p className="mt-8 text-lg text-muted max-w-text leading-relaxed">
              Tell us about your project and we will get back to you within two business days.
            </p>
          </div>
        </section>

        <section className="py-32 md:py-40 px-6 md:px-12 border-t border-border">
          <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
            <aside className="md:col-span-4 space-y-12">
              <div>
                <p className="text-eyebrow uppercase text-muted mb-3">Email</p>
                <a
                  href="mailto:hello@brandex.studio"
                  className="text-foreground hover:text-accent transition-colors duration-400"
                >
                  hello@brandex.studio
                </a>
              </div>

              <div>
                <p className="text-eyebrow uppercase text-muted mb-3">Location</p>
                <p className="text-foreground">Remote · Worldwide</p>
              </div>

              <div>
                <p className="text-eyebrow uppercase text-muted mb-3">Response time</p>
                <p className="text-foreground">Within 2 business days</p>
              </div>
            </aside>

            <div className="md:col-span-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
