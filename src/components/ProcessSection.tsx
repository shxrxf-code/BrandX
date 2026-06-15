'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const stages = [
  { title: 'Research', description: 'Understanding your market, users, and competition before making any decisions.' },
  { title: 'Strategy', description: 'Turning insights into a clear roadmap with defined goals and milestones.' },
  { title: 'Design', description: 'Crafting intuitive interfaces and compelling visual experiences.' },
  { title: 'Development', description: 'Building robust, scalable solutions with modern technology.' },
  { title: 'Launch', description: 'Deploying, testing, and optimizing for production readiness.' },
  { title: 'Growth', description: 'Continuous improvement through data-driven iteration and optimization.' },
]

export default function ProcessSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative bg-secondary py-20 md:py-28 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            How We Work
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            From idea to impact.
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-0 md:gap-12">
          <div className="md:w-64 shrink-0">
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
              {stages.map((stage, i) => (
                <button
                  key={stage.title}
                  onClick={() => setActive(i)}
                  className={`text-left whitespace-nowrap md:whitespace-normal px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active === i
                      ? 'bg-accent text-white'
                      : 'text-muted hover:text-foreground hover:bg-white'
                  }`}
                >
                  {stage.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-h-[200px]">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className={active === i ? 'block' : 'hidden'}
              >
                <div className="bg-white rounded-xl border border-border p-8">
                  <span className="text-4xl font-display font-bold text-accent/20 mb-3 block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-display font-bold tracking-tight mb-3">
                    {stage.title}
                  </h3>
                  <p className="text-muted leading-relaxed max-w-lg">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center gap-2"
        >
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-accent/50'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
