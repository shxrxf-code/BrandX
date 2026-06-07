const pillars = [
  {
    title: 'Strategy',
    description:
      'We start by understanding your business, your market, and your customers. Every decision is grounded in research and built to drive measurable outcomes.',
  },
  {
    title: 'Design',
    description:
      'We design for clarity and craft. Every interface, every system, every brand element is built to be premium, intuitive, and built to scale.',
  },
  {
    title: 'Growth',
    description:
      'We do not just ship and leave. We run the programs that compound, from SEO and content to paid media and lifecycle, and we measure what moves the business.',
  },
]

export default function WhyBrandex() {
  return (
    <section className="py-32 md:py-40 px-6 md:px-12 border-t border-border">
      <div className="max-w-content mx-auto">
        <div className="max-w-text mb-20">
          <p className="text-eyebrow uppercase text-muted mb-6">Why Brandex</p>
          <h2 className="text-section font-semibold text-foreground">
            How we work.
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {pillars.map((pillar) => (
            <li key={pillar.title}>
              <h3 className="text-2xl font-medium text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
