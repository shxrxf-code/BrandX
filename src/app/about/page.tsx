import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'About',
  description: 'A small senior team building digital products that drive real growth.',
}

export default function AboutPage() {
  return (
    <>
      <main className="pt-32 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-600/5 blur-[150px] animate-aurora-slow" />
          <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[100px] animate-aurora" style={{ animationDelay: '-3s' }} />
        </div>
        <section className="px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="w-full">
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">About</span>
            <h1 className="text-heading-1 font-bold tracking-tight max-w-text">
              We build digital products that drive real growth.
            </h1>
            <p className="mt-6 text-base text-muted max-w-text leading-relaxed">
              Brandex is a digital experience studio. We work with a small number of clients on the work that matters most to their business — brand, web, and growth.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 xl:px-20 mt-16 border-t border-border">
          <div className="w-full grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <p className="text-sm font-semibold text-muted uppercase tracking-wider">Approach</p>
            </div>
            <div className="md:col-span-9 max-w-text">
              <div className="glass rounded-2xl p-6 md:p-8">
                <p className="text-base text-foreground leading-relaxed">
                  We believe great work comes from small teams, deep focus, and a real partnership with the people we work with. We are not a holding company. We are a studio of senior practitioners who care about craft and outcomes in equal measure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 lg:px-16 xl:px-20 border-t border-border">
          <div className="w-full grid md:grid-cols-3 gap-10">
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
              <div key={value.title} className="glass-card rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-display font-bold tracking-tight mb-3 text-foreground">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 lg:px-16 xl:px-20 border-t border-border">
          <div className="w-full text-center">
            <h2 className="text-heading-2 font-bold tracking-tight mb-4">Let&apos;s work together.</h2>
            <p className="text-muted mb-8 max-w-lg mx-auto">We take on a small number of new projects each quarter.</p>
              <Link
                href="/contact"
                className="inline-flex px-6 py-3 btn-gradient text-sm"
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
