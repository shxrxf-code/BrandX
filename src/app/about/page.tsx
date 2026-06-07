import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'

export const metadata = {
  title: 'About',
  description: 'A small senior team building brands that grow online.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-40">
        <section className="px-6 md:px-12">
          <div className="max-w-content mx-auto">
            <h1 className="text-hero font-semibold text-foreground max-w-text">
              A small, senior team.
            </h1>
            <p className="mt-8 text-lg text-muted max-w-text leading-relaxed">
              Brandex is a digital studio. We work with a small number of clients on the work that matters most to their business — brand, web, and growth.
            </p>
          </div>
        </section>

        <section className="py-32 md:py-40 px-6 md:px-12 border-t border-border">
          <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <p className="text-eyebrow uppercase text-muted">Approach</p>
            </div>
            <div className="md:col-span-9 max-w-text">
              <p className="text-lg text-foreground leading-relaxed">
                We believe great work comes from small teams, deep focus, and a real partnership with the people we work with. We are not a holding company. We are a studio of senior practitioners who care about craft and outcomes in equal measure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 border-t border-border">
          <div className="max-w-content mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
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
                <li key={value.title}>
                  <h3 className="text-2xl font-medium text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{value.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </>
  )
}
