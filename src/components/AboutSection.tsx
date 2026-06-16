'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '8+', label: 'Years in Business' },
]

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
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-600/5 blur-[150px] animate-aurora-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-accent/5 blur-[100px] animate-aurora" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-6 md:p-8 text-center">
              <span className="text-3xl md:text-4xl font-display font-bold text-accent tracking-tight block">
                {s.value}
              </span>
              <p className="text-sm text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-muted uppercase tracking-wider">Approach</p>
          </div>
          <div className="md:col-span-9 max-w-3xl">
            <div className="glass rounded-2xl p-6 md:p-8">
              <p className="text-base text-foreground leading-relaxed">
                We believe great work comes from small teams, deep focus, and a real partnership with the
                people we work with. We are not a holding company. We are a studio of senior practitioners
                who care about craft and outcomes in equal measure.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
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
          className="text-center border-t border-white/10 pt-16"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-muted uppercase tracking-wider font-semibold mb-3">Our Mission</p>
            <p className="text-xl md:text-2xl text-foreground font-display font-bold tracking-tight leading-snug">
              To help ambitious businesses build digital products that create measurable impact — through
              strategy, design, and technology delivered by senior practitioners who care.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
