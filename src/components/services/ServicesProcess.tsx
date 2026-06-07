'use client'

import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

const phases = [
  {
    number: '01',
    title: 'Audit & Strategy',
    duration: 'Week 1–2',
    activities: ['Stakeholder interviews', 'Competitive audit', 'Audience research', 'Strategic brief'],
  },
  {
    number: '02',
    title: 'Design & Prototype',
    duration: 'Week 3–6',
    activities: ['Identity & system', 'UX architecture', 'High-fidelity UI', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Build & Integrate',
    duration: 'Week 7–12',
    activities: ['Engineering', 'CMS integration', 'QA & accessibility', 'Performance budgets'],
  },
  {
    number: '04',
    title: 'Launch & Scale',
    duration: 'Week 13+',
    activities: ['GTM', 'Analytics', 'CRO & testing', 'Ongoing partnership'],
  },
]

export default function ServicesProcess() {
  return (
    <section id="process" className="relative py-24 md:py-32 border-t border-white/[0.04]">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <SectionLabel number="02" label="How We Engage" className="mb-6" />
            <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl">
              A predictable path,{' '}
              <span className="text-gradient-shine">unpredictable craft</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-lg text-white/55 leading-relaxed">
              Every engagement follows the same proven four-phase path — but the
              craft, the people, and the outcomes are uniquely yours.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 rounded-3xl glass-elevated border border-white/[0.06] hover:border-accent/30 transition-colors duration-500"
            >
              <div className="font-mono text-xs text-accent tracking-[0.2em] mb-2">
                {phase.number}
              </div>
              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                {phase.title}
              </h3>
              <div className="text-xs text-white/40 font-mono uppercase tracking-wider mb-6">
                {phase.duration}
              </div>
              <ul className="space-y-2">
                {phase.activities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-white/65">
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
