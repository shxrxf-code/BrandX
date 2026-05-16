'use client'

import { motion } from 'framer-motion'

const stats = [
  { label: 'Projects Completed', value: '150+' },
  { label: 'Reach Generated', value: '10M+' },
  { label: 'Client Satisfaction', value: '99%' },
  { label: 'Years Excellence', value: '08' },
]

export default function Trust() {
  return (
    <section className="py-24 border-y border-white/5 bg-background-secondary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-gradient">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
