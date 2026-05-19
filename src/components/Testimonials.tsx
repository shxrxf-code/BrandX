'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const testimonials = [
  {
    quote: "Brandex transformed our digital presence completely. The attention to detail and strategic thinking behind every decision was remarkable. Our conversions increased by 340%.",
    author: 'Rajesh Kumar',
    role: 'CEO, SolarTech Energy',
    avatar: 'RK',
  },
  {
    quote: "Working with Brandex felt like having an extension of our own team. They understood our vision instantly and delivered beyond our highest expectations.",
    author: 'Priya Sharma',
    role: 'Founder, NOIR Fashion',
    avatar: 'PS',
  },
  {
    quote: "The level of craft and precision in their work is unmatched. Every interaction feels intentional, every animation serves a purpose. Truly world-class.",
    author: 'Arjun Mehta',
    role: 'CTO, FinFlow',
    avatar: 'AM',
  },
]

export default function Testimonials() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase mb-4 block">
              Client Stories
            </span>
            <h2 className="font-display text-section font-bold text-gradient mb-6">
              Trusted by Industry Leaders
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.15} direction="up" distance={40}>
              <motion.div
                className="glass-card rounded-3xl p-8 h-full flex flex-col relative group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Quote size={32} className="text-accent-blue/20 mb-6" />
                <p className="text-text-secondary leading-relaxed mb-8 flex-grow">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-display font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-display text-white font-semibold">
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
