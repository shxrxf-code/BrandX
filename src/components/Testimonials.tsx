'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Verified Client',
    role: 'Chief Executive Officer',
    content: 'The agency transformed our entire digital identity. Their attention to detail and creative vision is unmatched. We saw a 300% increase in high-ticket leads within the first month.'
  },
  {
    name: 'Verified Client',
    role: 'Founder',
    content: 'The most professional and creative agency I have ever worked with. They don’t just build websites; they build status. Our brand has never looked more premium.'
  },
  {
    name: 'Verified Client',
    role: 'Marketing Director',
    content: 'Cinematic, fast, and highly effective. The team knows exactly how to capture a premium audience. Their AI integration has saved us hundreds of hours.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-blue font-display font-bold uppercase tracking-widest text-sm mb-4"
          >
            What our clients say
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            Trusted by <span className="text-white/20">Industry Leaders.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] glass relative group hover:border-white/20 transition-all duration-500"
            >
              <Quote className="w-10 h-10 text-accent-blue/20 mb-8 group-hover:text-accent-blue/40 transition-colors" />
              
              <p className="text-xl text-white/70 leading-relaxed mb-10 italic">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple opacity-50" />
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-white/30 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/5 blur-[120px] rounded-full" />
      </div>
    </section>
  )
}
