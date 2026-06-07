import Link from 'next/link'
import { services } from '@/data/services'

export default function ServicesSection() {
  return (
    <section className="py-32 md:py-40 px-6 md:px-12 border-t border-border">
      <div className="max-w-content mx-auto">
        <div className="max-w-text mb-20">
          <p className="text-eyebrow uppercase text-muted mb-6">Services</p>
          <h2 className="text-section font-semibold text-foreground">
            What we do.
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((service) => (
            <li key={service.id} className="bg-background p-10 md:p-12">
              <h3 className="text-2xl font-medium text-foreground">
                {service.title}
              </h3>
              <p className="mt-4 text-muted leading-relaxed max-w-md">
                {service.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link
            href="/services"
            className="text-sm text-foreground hover:text-accent transition-colors duration-400"
          >
            Learn more about our services →
          </Link>
        </div>
      </div>
    </section>
  )
}
