'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

const values = [
  {
    number: '01',
    title: 'Craft over output',
    description: 'We measure success in decades, not deliverables. Every artifact is built to be admired and to compound.',
  },
  {
    number: '02',
    title: 'Truth in evidence',
    description: 'No opinion is allowed in the room without data. We defend decisions with research and measure outcomes relentlessly.',
  },
  {
    number: '03',
    title: 'Studio intimacy, enterprise rigor',
    description: 'You work directly with the principals — no account managers, no handoffs, no dilution. The team that scopes builds.',
  },
  {
    number: '04',
    title: 'Outcomes, not artifacts',
    description: 'Beautiful work that doesn\'t move metrics is decoration. We exist to grow businesses and elevate brands.',
  },
  {
    number: '05',
    title: 'Generous with knowledge',
    description: 'We publish what we learn. We mentor juniors. We treat the industry — not just our studio — as something worth improving.',
  },
  {
    number: '06',
    title: 'Built to last',
    description: 'We have never raised, never over-hired, and never compromised on the kind of work we put our name on.',
  },
]

export default function AboutValues() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <SectionLabel number="04" label="Values" className="mb-6" />
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl">
              What we{' '}
              <span className="text-gradient-shine">refuse to compromise</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-lg text-white/55 leading-relaxed">
              Six principles, written down so we can hold ourselves to them when
              the deadline is tight and the temptation is real.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 md:p-8 rounded-3xl glass-elevated border border-white/[0.06] hover:border-accent/30 transition-colors duration-500"
            >
              <div className="font-mono text-xs text-accent tracking-[0.2em] mb-4">
                {v.number}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-3 leading-snug">
                {v.title}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
