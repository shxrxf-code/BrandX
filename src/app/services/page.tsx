import Footer from '@/components/Footer'
import { services } from '@/data/services'

export const metadata = {
  title: 'Services',
  description: 'Web development, UI/UX design, SEO, and digital marketing services.',
}

export default function ServicesPage() {
  return (
    <>
      <main className="pt-32 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[120px] animate-aurora-slow" />
          <div className="absolute -bottom-40 right-1/4 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[100px] animate-aurora" style={{ animationDelay: '-5s' }} />
        </div>
        <section className="px-6 md:px-10 relative z-10">
          <div className="max-w-content mx-auto">
            <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">Services</span>
            <h1 className="text-heading-1 font-bold tracking-tight max-w-text">
              What we do.
            </h1>
            <p className="mt-6 text-base text-muted max-w-text leading-relaxed">
              We focus on core capabilities. Each one is staffed by senior practitioners and delivered as a single integrated team.
            </p>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 md:px-10 mt-16 border-t border-border">
          <div className="max-w-content mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <div key={service.id} className="glass-card rounded-xl p-8">
                  <span className="text-xs text-muted font-semibold tracking-wider uppercase mb-2 block">0{i + 1}</span>
                  <h2 className="text-xl font-display font-bold tracking-tight mb-3">{service.title}</h2>
                  <p className="text-sm text-muted leading-relaxed mb-6">{service.description}</p>
                  <div>
                    <p className="text-[10px] text-muted font-semibold tracking-wider uppercase mb-2">What you get</p>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((d) => (
                        <li key={d} className="text-sm text-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
