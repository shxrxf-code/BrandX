'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'They didn\'t just redesign our website — they reimagined how our customers experience our brand. The results exceeded every benchmark we set.',
    name: 'Sarah Chen',
    role: 'CEO, SolarTech Energy',
  },
  {
    quote: 'Working with this team feels like having a world-class design studio and engineering firm rolled into one. The speed and quality are unmatched.',
    name: 'Marcus Rivera',
    role: 'Founder, Drifto',
  },
  {
    quote: 'They don\'t just deliver projects — they become true partners invested in your success. Our NPS score jumped 35 points post-launch.',
    name: 'Priya Patel',
    role: 'CTO, FinFlow',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative bg-surface py-20 md:py-28 overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Testimonials
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            Trusted by leaders.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 md:p-8"
            >
              <svg className="w-6 h-6 text-accent/20 mb-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
