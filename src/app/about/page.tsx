import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'About',
  description: 'A small senior team building digital products that drive real growth.',
}

export default function AboutPage() {
  return (
    <>
      <main className="pt-32">
        <section className="px-6 md:px-10">
          <div className="max-w-content mx-auto">
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">About</span>
            <h1 className="text-heading-1 font-bold tracking-tight max-w-text">
              We build digital products that drive real growth.
            </h1>
            <p className="mt-6 text-base text-muted max-w-text leading-relaxed">
              Brandex is a digital experience studio. We work with a small number of clients on the work that matters most to their business — brand, web, and growth.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-10 mt-16 border-t border-border">
          <div className="max-w-content mx-auto grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <p className="text-sm font-semibold text-muted uppercase tracking-wider">Approach</p>
            </div>
            <div className="md:col-span-9 max-w-text">
              <p className="text-base text-foreground leading-relaxed">
                We believe great work comes from small teams, deep focus, and a real partnership with the people we work with. We are not a holding company. We are a studio of senior practitioners who care about craft and outcomes in equal measure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-10 border-t border-border">
          <div className="max-w-content mx-auto grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Senior only',
                body: 'Every person on your project is a senior practitioner. No junior staff learning on your time.',
              },
              {
                title: 'Small by design',
                body: 'We limit the number of active engagements so the work gets the attention it deserves.',
              },
              {
                title: 'Outcome-led',
                body: 'We measure success the same way you do — pipeline, conversion, revenue, retention.',
              },
            ].map((value) => (
              <div key={value.title}>
                <h3 className="text-lg font-display font-bold tracking-tight mb-3">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 md:px-10 border-t border-border">
          <div className="max-w-content mx-auto text-center">
            <h2 className="text-heading-2 font-bold tracking-tight mb-4">Let&apos;s work together.</h2>
            <p className="text-muted mb-8 max-w-md mx-auto">We take on a small number of new projects each quarter.</p>
            <Link
              href="/contact"
              className="inline-flex px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors duration-200"
            >
              Start a Project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
