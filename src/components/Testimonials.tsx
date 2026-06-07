import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  return (
    <section className="py-32 md:py-40 px-6 md:px-12 border-t border-border">
      <div className="max-w-content mx-auto">
        <div className="max-w-text mb-20">
          <p className="text-eyebrow uppercase text-muted mb-6">Testimonials</p>
          <h2 className="text-section font-semibold text-foreground">
            What clients say.
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {testimonials.map((t, i) => (
            <li key={i}>
              <p className="text-lg text-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8">
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-muted">
                  {t.role}, {t.company}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
