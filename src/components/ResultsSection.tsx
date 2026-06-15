'use client'

import { motion } from 'framer-motion'

const metrics = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Team Members' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '8+', label: 'Years Active' },
]

const stats = [
  { value: '350%', label: 'Average ROI', desc: 'Measured across all campaigns and projects delivered in the last 24 months.' },
  { value: '3.2x', label: 'Faster Time-to-Market', desc: 'Through optimized agile workflows and parallelized delivery streams.' },
  { value: '94%', label: 'Repeat Client Rate', desc: 'Trust built through consistent delivery and measurable business impact.' },
]

export default function ResultsSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Results
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            Measurable impact.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="text-3xl md:text-4xl font-display font-bold text-accent tracking-tight block">
                {m.value}
              </span>
              <p className="text-sm text-muted mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-white"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-display font-bold text-accent">{s.value}</span>
                <h4 className="text-sm font-semibold text-foreground">{s.label}</h4>
              </div>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
