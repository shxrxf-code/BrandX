'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const values = [
  {
    title: 'Senior only',
    body: 'Every person on your project is a senior practitioner. No junior staff learning on your time.',
  },
  {
    title: 'Small by design',
    body: 'We limit the number of active engagements so the work gets the attention it deserves.',
  },
  {
    title: 'Outcome-led',
    body: 'We measure success the same way you do — pipeline, conversion, revenue, retention.',
  },
]

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background scroll-mt-24" id="about">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-600/5 blur-[120px] animate-aurora-slow" />
      </div>
      <div className="max-w-content mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-4">
            About
          </span>
          <h2 className="text-heading-1 font-bold tracking-tight max-w-text">
            We build digital products that drive real growth.
          </h2>
          <p className="mt-6 text-base text-muted max-w-text leading-relaxed">
            Brandex is a digital experience studio. We work with a small number of clients on the work
            that matters most to their business — brand, web, and growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">Approach</p>
          </div>
          <div className="md:col-span-9 max-w-text">
            <div className="glass rounded-2xl p-6 md:p-8">
              <p className="text-base text-foreground leading-relaxed">
                We believe great work comes from small teams, deep focus, and a real partnership with the
                people we work with. We are not a holding company. We are a studio of senior practitioners
                who care about craft and outcomes in equal measure.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <h3 className="text-lg font-display font-bold tracking-tight mb-3 text-foreground">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 text-center border-t border-white/10 pt-20"
        >
          <h2 className="text-heading-2 font-bold tracking-tight mb-4">Let&apos;s work together.</h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            We take on a small number of new projects each quarter.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 btn-gradient text-sm"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
