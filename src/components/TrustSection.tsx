import { trustedBy } from '@/data/testimonials'

export default function TrustSection() {
  return (
    <section className="py-20 px-6 md:px-12 border-t border-border">
      <p className="text-eyebrow uppercase text-muted text-center mb-10">
        Trusted by
      </p>

      <ul className="max-w-content mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {trustedBy.map((logo) => (
          <li
            key={logo}
            className="text-base text-muted font-medium tracking-tight"
          >
            {logo}
          </li>
        ))}
      </ul>
    </section>
  )
}
