import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import { services } from '@/data/services'

export const metadata = {
  title: 'Services',
  description: 'Brand, web, SEO, and digital marketing for ambitious companies.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="pt-40">
        <section className="px-6 md:px-12">
          <div className="max-w-content mx-auto">
            <h1 className="text-hero font-semibold text-foreground max-w-text">
              Services.
            </h1>
            <p className="mt-8 text-lg text-muted max-w-text leading-relaxed">
              We focus on four core capabilities. Each one is staffed by senior practitioners and delivered as a single integrated team.
            </p>
          </div>
        </section>

        <section className="py-32 md:py-40 px-6 md:px-12 border-t border-border">
          <div className="max-w-content mx-auto">
            <ul className="divide-y divide-border">
              {services.map((service, i) => (
                <li key={service.id} className="py-12 md:py-16">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-1">
                      <span className="text-sm text-muted">
                        0{i + 1}
                      </span>
                    </div>

                    <div className="md:col-span-7">
                      <h2 className="text-3xl md:text-4xl font-medium text-foreground">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-muted leading-relaxed max-w-md">
                        {service.description}
                      </p>
                    </div>

                    <div className="md:col-span-4">
                      <p className="text-eyebrow uppercase text-muted mb-4">
                        What you get
                      </p>
                      <ul className="space-y-2">
                        {service.deliverables.map((d) => (
                          <li key={d} className="text-sm text-foreground">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
