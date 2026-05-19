'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const testimonials = [
  {
    quote: "Brandex transformed our digital presence completely. The attention to detail and strategic thinking behind every decision was remarkable. Our conversions increased by 340%.",
    author: 'Rajesh Kumar',
    role: 'CEO, SolarTech Energy',
    avatar: 'RK',
    rating: 5,
  },
  {
    quote: "Working with Brandex felt like having an extension of our own team. They understood our vision instantly and delivered beyond our highest expectations.",
    author: 'Priya Sharma',
    role: 'Founder, Drifto Fashion',
    avatar: 'PS',
    rating: 5,
  },
  {
    quote: "The level of craft and precision in their work is unmatched. Every interaction feels intentional, every animation serves a purpose. Truly world-class.",
    author: 'Arjun Mehta',
    role: 'CTO, FinFlow',
    avatar: 'AM',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Client Stories
            </motion.span>
            <motion.h2
              className="font-display text-section font-bold text-gradient mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Trusted by Industry Leaders
            </motion.h2>
          </div>
        </ScrollReveal>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.12} direction="up" distance={40}>
              <motion.div
                className="glass-card rounded-3xl p-8 h-full flex flex-col relative group hover:border-accent-blue/20 transition-colors duration-500"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Quote icon */}
                <Quote size={32} className="text-accent-blue/20 mb-6 group-hover:text-accent-blue/40 transition-colors duration-500" />

                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-accent-blue fill-accent-blue" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-text-secondary leading-relaxed mb-8 flex-grow text-body">
                  {testimonial.quote}
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-display font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-display text-white font-semibold group-hover:text-accent-blue transition-colors duration-300">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
