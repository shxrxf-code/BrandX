import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Tell us about your project.',
}

export default function ContactPage() {
  return (
    <>
      <main className="pt-32 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] animate-aurora-slow" />
          <div className="absolute -bottom-40 right-1/4 w-[300px] h-[300px] rounded-full bg-magenta/5 blur-[100px] animate-aurora" style={{ animationDelay: '-4s' }} />
        </div>
        <section className="px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="w-full">
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">Contact</span>
            <h1 className="text-heading-1 font-bold tracking-tight max-w-text">
              Get in touch.
            </h1>
            <p className="mt-6 text-base text-muted max-w-text leading-relaxed">
              Tell us about your project and we will get back to you within two business days.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20 mt-12 border-t border-border">
          <div className="w-full grid md:grid-cols-12 gap-12">
            <aside className="md:col-span-4 space-y-8">
              <div>
                <p className="text-xs text-muted font-semibold tracking-wider uppercase mb-2">Email</p>
                <a
                  href="mailto:hello@brandexdigital.in"
                  className="text-sm text-foreground hover:text-accent transition-colors duration-200"
                >
                  hello@brandexdigital.in
                </a>
              </div>
              <div>
                <p className="text-xs text-muted font-semibold tracking-wider uppercase mb-2">Location</p>
                <p className="text-sm text-foreground">Remote · Worldwide</p>
              </div>
              <div>
                <p className="text-xs text-muted font-semibold tracking-wider uppercase mb-2">Response time</p>
                <p className="text-sm text-foreground">Within 2 business days</p>
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
